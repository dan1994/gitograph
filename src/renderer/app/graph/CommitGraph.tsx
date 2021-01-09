import * as React from "react";

import { IEdge } from "renderer/app/graph/types";
import Vertice from "renderer/app/graph/Vertice";
import Edge from "renderer/app/graph/Edge";
import { COLUMN_OFFSET, ROW_OFFSET, toPoint } from "renderer/app/graph/utils";
import { ICommits } from "renderer/app/store/hooks/types";
import { useRepositoryContext } from "renderer/app/store/Repository";

type IEdges = { [id: string]: IEdge };

const getEdges: (commits: ICommits) => IEdges = (commits) => {
    const edges: IEdges = {};
    for (const [oid, commit] of Object.entries(commits)) {
        for (const parentOid of commit.parents) {
            const parent = commits[parentOid];
            edges[`${oid}_${parentOid}`] = {
                from: commit,
                to: parent,
            };
        }
    }

    return edges;
};

const calculateWidth: (nodes: ICommits) => number = (nodes) => {
    const rightMostVerticeCenter = Math.max(
        ...Object.values(nodes).map(({ cell }) => toPoint(cell).x),
        -COLUMN_OFFSET
    );

    return rightMostVerticeCenter + COLUMN_OFFSET;
};

const calculateHeight: (nodes: ICommits) => number = (nodes) => {
    const bottomMostVerticeCenter = Math.max(
        ...Object.values(nodes).map(({ cell }) => toPoint(cell).y),
        -ROW_OFFSET
    );

    return bottomMostVerticeCenter + ROW_OFFSET;
};

const CommitGraph: React.FC = () => {
    const { commits } = useRepositoryContext();

    const width = calculateWidth(commits);
    const height = calculateHeight(commits);

    const edges = getEdges(commits);

    return (
        <svg width={width} height={height}>
            {Object.entries(edges).map(([id, edge]) => {
                return <Edge key={id} edge={edge} />;
            })}
            {Object.entries(commits).map(([oid, commit]) => (
                <Vertice key={oid} vertice={commit} />
            ))}
        </svg>
    );
};

export default CommitGraph;
