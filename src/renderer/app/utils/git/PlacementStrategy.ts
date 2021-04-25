import { ICommit, ISha1 } from "renderer/app/utils/git/types";
import Commits from "renderer/app/utils/git/Commits";

class PlacementStrategy {
    private commits: Commits;
    private activeBranches: Array<ISha1>;

    private static COLORS = [
        "SeaGreen".toLowerCase(),
        "RoyalBlue".toLowerCase(),
        "MediumSlateBlue".toLowerCase(),
        "FireBrick".toLowerCase(),
        "DarkGoldenRod".toLowerCase(),
    ];

    constructor(commits: Commits) {
        this.commits = commits;
        this.activeBranches = [];
    }

    apply: () => void = () => {
        this.populateColumns();
        this.populateColors();
    };

    private populateColumns: () => void = () => {
        this.commits.commits.forEach((commit) => {
            const branchChildrenOids = this.getBranchChildrenOids(commit);

            if (branchChildrenOids.length > 0) {
                this.replaceChildrenWithCommit(commit, branchChildrenOids);
            } else {
                this.insertCommit(commit);
            }
        });
    };

    private getBranchChildrenOids: (commit: ICommit) => ISha1[] = (commit) => {
        return commit.children.filter(
            (childOid) =>
                this.commits.byHash(childOid).parents[0] === commit.oid
        );
    };

    private replaceChildrenWithCommit: (
        commit: ICommit,
        branchChildrenOids: ISha1[]
    ) => void = (commit, branchChildrenOids) => {
        let insertedCommit = false;

        this.activeBranches.forEach((currentCommitOid, index) => {
            if (currentCommitOid === null) {
                return;
            }

            if (branchChildrenOids.includes(currentCommitOid)) {
                if (insertedCommit) {
                    this.activeBranches[index] = null;
                } else {
                    this.activeBranches[index] = commit.oid;
                    commit.column = Number(index);
                    insertedCommit = true;
                }
            }
        });
    };

    private insertCommit: (commit: ICommit) => void = (commit) => {
        const firstNullIndex = this.activeBranches.indexOf(null);

        if (firstNullIndex === -1) {
            this.activeBranches.push(commit.oid);
            commit.column = this.activeBranches.length - 1;
        } else {
            this.activeBranches[firstNullIndex] = commit.oid;
            commit.column = firstNullIndex;
        }
    };

    private populateColors: () => void = () => {
        this.commits.commits.forEach((commit) => {
            commit.color = PlacementStrategy.chooseColor(commit.column);
        });
    };

    private static chooseColor: (column: number) => string = (column) => {
        return PlacementStrategy.COLORS[
            column % PlacementStrategy.COLORS.length
        ];
    };
}

export default PlacementStrategy;
