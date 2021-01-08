class Commit {
    oid: string;
    timestamp: number;
    parents: Commit[];
    children: Commit[];

    constructor(oid: string, timestamp: number) {
        this.oid = oid;
        this.timestamp = timestamp;
        this.parents = [];
        this.children = [];
    }

    getBranchChildren: () => Commit[] = () => {
        return this.children.filter(
            (child) => child.parents[0].oid === this.oid
        );
    };

    static compare: (commit1: Commit, commit2: Commit) => number = (
        commit1,
        commit2
    ) => {
        return commit2.timestamp - commit1.timestamp;
    };
}

export default Commit;
