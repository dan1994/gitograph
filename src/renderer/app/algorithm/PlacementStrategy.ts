import { ISha1 } from "renderer/app/git/types";
import { ICommit, ICommits } from "renderer/app/store/hooks/types";

class PlacementStrategy {
    private commits: ICommits;
    private activeBranches: Array<ISha1>;

    private static COLORS = [
        "SeaGreen".toLowerCase(),
        "RoyalBlue".toLowerCase(),
        "MediumSlateBlue".toLowerCase(),
        "FireBrick".toLowerCase(),
        "DarkGoldenRod".toLowerCase(),
    ];

    constructor(commits: ICommits) {
        this.commits = commits;
        this.activeBranches = [];
    }

    apply: () => void = () => {
        this.populateRows();
        this.populateColumns();
        this.populateColors();
    };

    private populateRows: () => void = () => {
        Object.values(this.commits)
            .sort(PlacementStrategy.compareCommits)
            .map((commit, index) => {
                commit.cell.row = index;
            });
    };

    private populateColumns: () => void = () => {
        const sortedByRows: ISha1[] = Object.entries(this.commits)
            .sort(
                ([_1, commit1], [_2, commit2]) =>
                    commit1.cell.row - commit2.cell.row
            )
            .map(([oid, _]) => oid);

        for (const oid of sortedByRows) {
            this.populateColumn(oid);
        }
    };

    private populateColumn: (oid: ISha1) => void = (oid) => {
        const branchChildrenOids = this.getBranchChildrenOids(oid);

        if (branchChildrenOids.length > 0) {
            this.replaceChildrenWithCommit(oid, branchChildrenOids);
        } else {
            this.insertCommit(oid);
        }
    };

    private getBranchChildrenOids: (oid: ISha1) => ISha1[] = (oid) => {
        const commit = this.commits[oid];
        return commit.children.filter(
            (childOid) => this.commits[childOid].parents[0] === oid
        );
    };

    private replaceChildrenWithCommit: (
        oid: ISha1,
        branchChildrenOids: ISha1[]
    ) => void = (oid, branchChildrenOids) => {
        const commit = this.commits[oid];

        let insertedCommit = false;

        for (const index in this.activeBranches) {
            const currentCommitOid = this.activeBranches[index];

            if (currentCommitOid === null) {
                continue;
            }

            if (branchChildrenOids.includes(currentCommitOid)) {
                if (insertedCommit) {
                    this.activeBranches[index] = null;
                } else {
                    this.activeBranches[index] = oid;
                    commit.cell.column = Number(index);
                    insertedCommit = true;
                }
            }
        }
    };

    private insertCommit: (oid: ISha1) => void = (oid) => {
        const commit = this.commits[oid];
        const firstNullIndex = this.activeBranches.indexOf(null);

        if (firstNullIndex === -1) {
            this.activeBranches.push(oid);
            commit.cell.column = this.activeBranches.length - 1;
        } else {
            this.activeBranches[firstNullIndex] = oid;
            commit.cell.column = firstNullIndex;
        }
    };

    private populateColors: () => void = () => {
        for (const commit of Object.values(this.commits)) {
            commit.color = PlacementStrategy.chooseColor(commit.cell.column);
        }
    };

    private static chooseColor: (column: number) => string = (column) => {
        return PlacementStrategy.COLORS[
            column % PlacementStrategy.COLORS.length
        ];
    };

    private static compareCommits: (
        commit1: ICommit,
        commit2: ICommit
    ) => number = (commit1, commit2) => {
        return commit2.committer.timestamp - commit1.committer.timestamp;
    };
}

export default PlacementStrategy;
