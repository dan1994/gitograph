import PlacementStrategy from "renderer/app/algorithm/PlacementStrategy";
import { ICommitContent } from "renderer/app/git/types";
import { ICommit } from "renderer/app/store/hooks/types";

interface ILookupTable {
    [oid: string]: number;
}

class Commits {
    public commits: ICommit[];
    private lookupTable: ILookupTable;

    constructor(commits: ICommitContent[]) {
        this.lookupTable = {};

        this.toICommits(commits);
        const placementStrategy = new PlacementStrategy(this);
        placementStrategy.apply();
    }

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

    private toICommits: (commits: ICommitContent[]) => void = (commits) => {
        this.commits = commits.map((commit) => this.toICommit(commit));
        this.populateChildren();
    };

    private toICommit: (commit: ICommitContent) => ICommit = (commit) => {
        return {
            ...commit,
            children: [],
            cell: {
                row: -1,
                column: -1,
            },
            color: "",
        };
    };

    private populateChildren: () => void = () => {
        for (const commit of this.commits) {
            const parents = commit.parents.map((parent) => this.byHash(parent));
            parents.forEach((parent) => {
                parent.children.push(commit.oid);
            });
        }
    };

    private lookupCommit: (oid: string) => void = (oid) => {
        this.lookupTable[oid] = this.commits.findIndex(
            (commit) => commit.oid === oid
        );

        if (this.lookupTable[oid] === -1) {
            console.table(this.commits);
            throw Error(`${oid} cannot be found in commits`);
        }
    };
}

export default Commits;
