import * as React from "react";

import { IDirectedAcyclicGraph } from "renderer/app/graph/types";
import Vertice from "renderer/app/graph/Vertice";
import Edge from "renderer/app/graph/Edge";
import { COLUMN_OFFSET, ROW_OFFSET, toPoint } from "renderer/app/graph/utils";

interface DirectedAcyclicGraphProps {
    graph: IDirectedAcyclicGraph;
}

const DirectedAcyclicGraph: React.FC<DirectedAcyclicGraphProps> = ({
    graph,
}) => {
    const { vertices, edges } = graph;
    const width =
        COLUMN_OFFSET +
        Math.max(...vertices.map(({ cell }) => toPoint(cell).x));
    const height =
        ROW_OFFSET + Math.max(...vertices.map(({ cell }) => toPoint(cell).y));

    return (
        <svg width={width} height={height}>
            {edges.map((edge) => {
                const { from, to } = edge;
                const id = `${from.id}_${to.id}`;
                return <Edge key={id} edge={edge} />;
            })}
            {vertices.map((vertice) => (
                <Vertice key={vertice.id} vertice={vertice} />
            ))}
        </svg>
    );
};

export default DirectedAcyclicGraph;
