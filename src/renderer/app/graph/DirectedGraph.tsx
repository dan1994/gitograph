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

const DirectedGraph: React.FC<DirectedGraphProps> = ({ graph }) => {
    const width =
        COLUMN_OFFSET + Math.max(...graph.map(({ cell }) => toPoint(cell).x));
    const height =
        ROW_OFFSET + Math.max(...graph.map(({ cell }) => toPoint(cell).y));

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
