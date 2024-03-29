import { ICommit, ISortOrder } from "renderer/app/utils/git/types";
import PlacementStrategy from "renderer/app/utils/git/PlacementStrategy";
import { toDateString } from "renderer/app/utils/misc/date";
import CommandRunner from "renderer/app/utils/commandRunner/CommandRunner";

interface ILookupTable {
    [oid: string]: number;
}

class Commits {
    public commits: ICommit[];
    public hasUncommittedChanges: boolean;
    private lookupTable: ILookupTable;

    constructor() {
        this.clear();
    }

    public initOrRefresh: (
        gitDirectory: string,
        sortOrder: ISortOrder
    ) => Promise<void> = async (gitDirectory, sortOrder) => {
        this.clear();

        await this.getUncommittedChanges(gitDirectory);
        await this.getCommits(gitDirectory, sortOrder);
        this.populateChildren();
        new PlacementStrategy(this).apply();
    };

    public clear: () => void = () => {
        this.commits = [];
        this.hasUncommittedChanges = false;
        this.lookupTable = {};
    };

    public byHash: (oid: string) => ICommit = (oid) => {
        const currentIndex = this.lookupTable[oid];
        if (
            currentIndex === undefined ||
            currentIndex < 0 ||
            currentIndex >= this.commits.length
        ) {
            this.lookupCommit(oid);
        }

        const commit = this.commits[this.lookupTable[oid]];
        if (commit.oid === oid) {
            return commit;
        }

        this.lookupCommit(oid);
        return this.commits[this.lookupTable[oid]];
    };

    public static abbreviate: (oid: string) => string = (oid) =>
        oid.substring(0, 8);

    public static getFormattedDate: (commit: ICommit) => string = (commit) => {
        const date = new Date(commit.committer.timestamp * 1000);
        return toDateString(date);
    };

    public static UNCOMMITTED_CHANGES_OID = "*";

    private getUncommittedChanges: (
        gitDirectory: string
    ) => Promise<void> = async (gitDirectory) => {
        const [statusString, headString] = await Promise.all([
            CommandRunner.run(`git -C "${gitDirectory}" status --porcelain`),
            CommandRunner.run(`git -C "${gitDirectory}" rev-parse HEAD`),
        ]);

        if (statusString.trim().length === 0) {
            this.hasUncommittedChanges = false;
            return;
        }

        this.hasUncommittedChanges = true;
        this.commits.push({
            oid: Commits.UNCOMMITTED_CHANGES_OID,
            tree: "",
            parents: [headString.trim()],
            author: {
                name: "",
                email: "",
                timestamp: new Date().getTime() / 1000,
            },
            committer: {
                name: "",
                email: "",
                timestamp: new Date().getTime() / 1000,
            },
            message: "Uncommitted Changes",
            children: [],
            row: 0,
            column: -1,
            color: "",
        });
    };

    private getCommits: (
        gitDirectory: string,
        sortOrder: ISortOrder
    ) => Promise<void> = async (gitDirectory, sortOrder) => {
        const logString = (
            await CommandRunner.run(
                `git -C "${gitDirectory}" log ${
                    Commits.sortOrderToGitFlag[sortOrder]
                } --all --format=format:${[
                    "%H",
                    "%T",
                    "%P",
                    "%an",
                    "%ae",
                    "%at",
                    "%cn",
                    "%ce",
                    "%ct",
                    "%s",
                ].join("%x10")}`
            )
        ).trim();

        const incrementIfHasUncommittedChanges = this.hasUncommittedChanges
            ? 1
            : 0;

        logString.split("\n").forEach((commitInfo, index) => {
            const [
                oid,
                tree,
                parentsString,
                authorName,
                authorEmail,
                authorTimestampString,
                committerName,
                committerEmail,
                committerTimestampString,
                message,
            ] = commitInfo.split("\x10");

            const parents =
                parentsString.length > 0 ? parentsString.split(" ") : [];

            this.commits.push({
                oid,
                tree,
                parents,
                author: {
                    name: authorName,
                    email: authorEmail,
                    timestamp: parseInt(authorTimestampString),
                },
                committer: {
                    name: committerName,
                    email: committerEmail,
                    timestamp: parseInt(committerTimestampString),
                },
                message,
                children: [],
                row: index + incrementIfHasUncommittedChanges,
                column: -1,
                color: "",
            });
        });
    };

    private populateChildren: () => void = () => {
        this.commits.forEach((commit) => {
            const parents = commit.parents.map((parent) => this.byHash(parent));
            parents.forEach((parent) => {
                parent.children.push(commit.oid);
            });
        });
    };

    private lookupCommit: (oid: string) => void = (oid) => {
        this.lookupTable[oid] = this.commits.findIndex(
            (commit) => commit.oid === oid
        );

        if (this.lookupTable[oid] === -1) {
            throw Error(`${oid} cannot be found in commits`);
        }
    };

    private static sortOrderToGitFlag: { [sortOrder: string]: string } = {
        topological: "--topo-order",
        chronological: "--date-order",
    };
}

export default Commits;
