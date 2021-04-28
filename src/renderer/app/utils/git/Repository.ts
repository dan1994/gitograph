import CommandRunner from "../commandRunner/CommandRunner";
import { Commits, Refs } from "renderer/app/utils/git";
import { ICommit, IRefType, ISortOrder } from "renderer/app/utils/git/types";

class Repository {
    public commits: Commits;
    public refs: Refs;
    public rootDirectory: string;

    constructor() {
        this.commits = new Commits();
        this.refs = new Refs();
        this.rootDirectory = null;
    }

    public load: (
        directory: string,
        sortOrder: ISortOrder
    ) => Promise<void> = async (directory, sortOrder) => {
        const directoryWasChanged = await this.updateRootDirectory(directory);

        if (!directoryWasChanged) {
            return;
        }

        await this.refresh(sortOrder);
    };

    public refresh: (sortOrder: ISortOrder) => Promise<void> = async (
        sortOrder
    ) => {
        await Promise.all([
            this.commits.initOrRefresh(this.rootDirectory, sortOrder),
            this.refs.initOrRefresh(this.rootDirectory),
        ]);
    };

    public close: () => void = () => {
        this.commits.clear();
        this.refs.clear();
        this.rootDirectory = null;
    };

    public resolveRef: (refName: string, refType?: IRefType) => ICommit[] = (
        refName,
        refType
    ) =>
        this.refs
            .byName(refName, refType)
            .map(({ oid }) => this.commits.byHash(oid));

    private updateRootDirectory: (
        directory: string
    ) => Promise<boolean> = async (directory) => {
        const rootDirectory = (
            await CommandRunner.run(
                `git -C "${directory}" rev-parse --show-toplevel`
            )
        ).trimEnd();

        if (rootDirectory !== this.rootDirectory) {
            this.rootDirectory = rootDirectory;
            return true;
        }

        return false;
    };
}

export default Repository;
