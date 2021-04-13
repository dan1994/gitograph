import * as React from "react";
import { useMemo } from "react";

import { IEdge } from "renderer/app/pages/repoTable/graph/types";
import Vertice from "renderer/app/pages/repoTable/graph/Vertice";
import Edge from "renderer/app/pages/repoTable/graph/Edge";
import {
    COLUMN_OFFSET,
    ROW_OFFSET,
    toPoint,
} from "renderer/app/pages/repoTable/graph/utils";
import Commits from "renderer/app/global/context/Commits";

type IEdges = { [id: string]: IEdge };

const getEdges: (commits: Commits) => IEdges = (commits) => {
    const edges: IEdges = {};
    commits.commits.forEach((commit) => {
        commit.parents.forEach((parentOid) => {
            const parent = commits.byHash(parentOid);
            edges[`${commit.oid}_${parentOid}`] = {
                from: commit,
                to: parent,
            };
        });
    });

    return edges;
};

const calculateWidth: (commits: Commits) => number = (commits) => {
    const rightMostVerticeCenter = Math.max(
        ...commits.commits.map(({ cell }) => toPoint(cell).x),
        -COLUMN_OFFSET
    );

    return rightMostVerticeCenter + COLUMN_OFFSET;
};

const calculateHeight: (commits: Commits) => number = (commits) => {
    const bottomMostVerticeCenter = Math.max(
        ...commits.commits.map(({ cell }) => toPoint(cell).y),
        -ROW_OFFSET
    );

    return bottomMostVerticeCenter + ROW_OFFSET;
};

interface CommitGraphProps {
    commits: Commits;
    maxWidth: number;
}

const CommitGraph: React.FC<CommitGraphProps> = ({ commits, maxWidth }) => {
    const svgWidth = useMemo(() => calculateWidth(commits), [commits]);
    const svgHeight = useMemo(() => calculateHeight(commits), [commits]);

    const edges = useMemo(() => getEdges(commits), [commits]);

    const width = svgWidth > maxWidth ? maxWidth : svgWidth;

    return (
        <svg width={width} height={svgHeight}>
            {Object.entries(edges).map(([id, edge]) => {
                return <Edge key={id} edge={edge} />;
            })}
            {commits.commits.map((commit) => (
                <Vertice key={commit.oid} vertice={commit} />
            ))}
        </svg>
    );
};

export default CommitGraph;