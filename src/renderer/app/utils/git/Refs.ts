import { IRef, IRefType, ISha1 } from "renderer/app/utils/git/types";
import CommandRunner from "renderer/app/utils/commandRunner/CommandRunner";
import { split } from "renderer/app/utils/misc/string";

class Refs {
    public refs: IRef[];

    constructor() {
        this.clear();
    }

    public initOrRefresh: (gitDirectory: string) => Promise<void> = async (
        gitDirectory
    ) => {
        this.clear();

        await this.getRefs(gitDirectory);

        if (this.head() === undefined) {
            await this.getHeadRef(gitDirectory);
        }
    };

    public clear: () => void = () => {
        this.refs = [];
    };

    public pointTo: (oid: ISha1) => IRef[] = (oid) =>
        this.refs.filter(({ oid: refOid }) => refOid === oid);

    public branches: () => IRef[] = () =>
        this.refs.filter(
            ({ type }) => type === "localBranch" || type === "remoteBranch"
        );

    public tags: () => IRef[] = () =>
        this.refs.filter(({ type }) => type === "tag");

    public stashes: () => IRef[] = () =>
        this.refs.filter(({ type }) => type === "stash");

    public localBranches: () => IRef[] = () =>
        this.refs.filter(({ type }) => type === "localBranch");

    public remoteBranches: () => IRef[] = () =>
        this.refs.filter(({ type }) => type === "remoteBranch");

    public head: () => IRef = () => this.refs.filter(({ isHead }) => isHead)[0];

    public byName: (name: string, type?: IRefType) => IRef[] = (name, type) =>
        this.refs.filter(
            ({ name: refName, type: refType }) =>
                refName === name && (!type || refType === type)
        );

    public static isLocal: (ref: IRef) => boolean = (ref) =>
        ref.type !== "remoteBranch";

    private getRefs: (gitDirectory: string) => Promise<void> = async (
        gitDirectory
    ) => {
        const refsAsString = (
            await CommandRunner.run(
                `git -C "${gitDirectory}" for-each-ref --format="%(HEAD):%(objectname):%(refname:lstrip=1)"`
            )
        ).trim();

        refsAsString.split("\n").forEach((line) => {
            const [headMarker, oid, refName] = split(line, ":", 3);

            const isHead = headMarker === "*";
            const [preamble, rawName] = split(refName, "/", 2);
            const type = Refs.preambleToType[preamble];
            const name = rawName
                ? rawName.startsWith("(")
                    ? ""
                    : rawName
                : preamble;

            this.refs.push({ name, oid, type, isHead });
        });
    };

    private getHeadRef: (gitDirectory: string) => Promise<void> = async (
        gitDirectory
    ) => {
        const oid = (
            await CommandRunner.run(`git -C "${gitDirectory}" rev-parse HEAD`)
        ).trim();

        this.refs.push({
            name: "",
            oid,
            type: "detachedHead",
            isHead: true,
        });
    };

    private static preambleToType: { [preamble: string]: IRefType } = {
        heads: "localBranch",
        remotes: "remoteBranch",
        tags: "tag",
        stash: "stash",
    };
}

export default Refs;
