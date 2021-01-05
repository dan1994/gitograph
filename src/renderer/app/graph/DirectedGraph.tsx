import * as React from "react";

import { IDirectedGraph, IEdge, INode } from "renderer/app/graph/types";
import Vertice from "renderer/app/graph/Vertice";
import Edge from "renderer/app/graph/Edge";
import { COLUMN_OFFSET, ROW_OFFSET, toPoint } from "renderer/app/graph/utils";

interface DirectedGraphProps {
    graph: IDirectedGraph;
}

export const getNodeEdges: (node: INode) => IEdge[] = (node) => {
    return node.children.map((child) => ({
        from: node,
        to: child,
    }));
};

const calculateWidth: (graph: IDirectedGraph) => number = (graph) => {
    if (graph.length === 0) {
        return 0;
    }

    const rightMostVerticeCenter = Math.max(
        ...graph.map(({ cell }) => toPoint(cell).x)
    );

    return rightMostVerticeCenter + COLUMN_OFFSET;
};

const calculateHeight: (graph: IDirectedGraph) => number = (graph) => {
    if (graph.length === 0) {
        return 0;
    }

    const bottomMostVerticeCenter = Math.max(
        ...graph.map(({ cell }) => toPoint(cell).y)
    );

    return bottomMostVerticeCenter + ROW_OFFSET;
};

const DirectedGraph: React.FC<DirectedGraphProps> = ({ graph }) => {
    const width = calculateWidth(graph);
    const height = calculateHeight(graph);

    const edges = graph.map(getNodeEdges).flat();

    return (
        <svg width={width} height={height}>
            {edges.map((edge) => {
                const { from, to } = edge;
                const id = `${from.id}_${to.id}`;
                return <Edge key={id} edge={edge} />;
            })}
            {graph.map((node) => (
                <Vertice key={node.id} vertice={node} />
            ))}
        </svg>
    );
};

export default DirectedGraph;
