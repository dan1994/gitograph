import { ISha1 } from "renderer/app/utils/git/types";
import { ICommit } from "renderer/app/global/context/types";
import Commits from "renderer/app/global/context/Commits";

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
        this.populateRows();
        this.populateColumns();
        this.populateColors();
    };

    private populateRows: () => void = () => {
        const latestCommits = this.commits.commits.filter(
            (commit) => commit.children.length === 0
        );

        let row = 0;
        while (latestCommits.length > 0) {
            latestCommits.sort(PlacementStrategy.compareCommits);
            const latestCommit = latestCommits.shift();

            latestCommits.push(
                ...latestCommit.parents
                    .map((oid) => this.commits.byHash(oid))
                    .filter((commit) => !latestCommits.includes(commit))
            );
            latestCommit.cell.row = row;
            row += 1;
        }
    };

    private populateColumns: () => void = () => {
        this.commits.commits.sort(
            (commit1, commit2) => commit1.cell.row - commit2.cell.row
        );

        this.commits.commits.forEach((commit) => {
            this.populateColumn(commit);
        });
    };

    private populateColumn: (commit: ICommit) => void = (commit) => {
        const branchChildrenOids = this.getBranchChildrenOids(commit);

        if (branchChildrenOids.length > 0) {
            this.replaceChildrenWithCommit(commit, branchChildrenOids);
        } else {
            this.insertCommit(commit);
        }
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
                    commit.cell.column = Number(index);
                    insertedCommit = true;
                }
            }
        });
    };

    private insertCommit: (commit: ICommit) => void = (commit) => {
        const firstNullIndex = this.activeBranches.indexOf(null);

        if (firstNullIndex === -1) {
            this.activeBranches.push(commit.oid);
            commit.cell.column = this.activeBranches.length - 1;
        } else {
            this.activeBranches[firstNullIndex] = commit.oid;
            commit.cell.column = firstNullIndex;
        }
    };

    private populateColors: () => void = () => {
        this.commits.commits.forEach((commit) => {
            commit.color = PlacementStrategy.chooseColor(commit.cell.column);
        });
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
