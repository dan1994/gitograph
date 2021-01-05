import { IDirectedGraph, IGridCell, INode } from "renderer/app/graph/types";
import Commit from "renderer/app/algorithm/Commit";

class GraphGenerator {
    private commits: Commit[];
    private activeBranches: Commit[];
    private mapping: { [oid: string]: IGridCell };

    private static COLORS = [
        "SeaGreen".toLowerCase(),
        "RoyalBlue".toLowerCase(),
        "MediumSlateBlue".toLowerCase(),
        "FireBrick".toLowerCase(),
        "DarkGoldenRod".toLowerCase(),
    ];

    constructor(commits: Commit[]) {
        this.commits = commits;
        this.activeBranches = [];
        this.mapping = {};
    }

    generate: () => IDirectedGraph = () => {
        this.createMapping();
        return this.toGraph();
    };

    private createMapping: () => void = () => {
        this.commits.sort(Commit.compare);
        this.populateRows();
        this.populateColumns();
    };

    private toGraph: () => IDirectedGraph = () => {
        const graph: IDirectedGraph = this.createGraphWithNoConnections();
        return this.addConnections(graph);
    };

    private populateRows: () => void = () => {
        for (const index in this.commits) {
            const { oid } = this.commits[index];
            this.mapping[oid] = {
                row: Number(index),
                column: 0,
            };
        }
    };

    private populateColumns: () => void = () => {
        for (const commit of this.commits) {
            this.populateColumn(commit);
        }
    };

    private populateColumn: (commit: Commit) => void = (commit) => {
        const branchChildren = commit.getBranchChildren();

        if (branchChildren.length > 0) {
            this.replaceChildrenWithCommit(commit, branchChildren);
        } else {
            this.insertCommit(commit);
        }
    };

    private replaceChildrenWithCommit: (
        commit: Commit,
        branchChildren: Commit[]
    ) => void = (commit, branchChildren) => {
        const oids = branchChildren.map(({ oid }) => oid);

        for (const index in this.activeBranches) {
            const currentCommit = this.activeBranches[index];

            if (oids.includes(currentCommit.oid)) {
                this.activeBranches[index] = commit;
                this.mapping[commit.oid].column = Number(index);
                break;
            }
        }
    };

    private insertCommit: (commit: Commit) => void = (commit) => {
        const { oid } = commit;
        this.activeBranches.push(commit);
        this.mapping[oid].column = this.activeBranches.length - 1;
    };

    private createGraphWithNoConnections: () => IDirectedGraph = () => {
        return this.commits.map<INode>(({ oid }) => {
            const cell = this.mapping[oid];
            const color = GraphGenerator.chooseColor(cell.column);

            return {
                cell,
                children: [],
                color,
                id: oid,
            };
        });
    };

    private addConnections: (graph: IDirectedGraph) => IDirectedGraph = (
        graph
    ) => {
        for (const index in this.commits) {
            const { parents } = this.commits[index];
            const connectionIndices = parents.map((child) =>
                this.commits.indexOf(child)
            );
            graph[index].children = connectionIndices.map((i) => graph[i]);
        }
        return graph;
    };

    private static chooseColor: (column: number) => string = (column) => {
        return GraphGenerator.COLORS[column % GraphGenerator.COLORS.length];
    };
}

export default GraphGenerator;
