import * as React from "react";

import { IEdge, IGridCell } from "renderer/app/graph/types";
import {
    EDGE_THICKNESS,
    toPoint,
    VERTICE_RADIUS,
} from "renderer/app/graph/utils";

interface EdgeProps {
    edge: IEdge;
}

const Edge: React.FC<EdgeProps> = ({ edge }) => {
    const { from, to } = edge;
    const { color } = from;

    const { x: fromX, y: fromY } = toPoint(from.cell);
    const { x: toX, y: toY } = toPoint(to.cell);

    if (fromX === toX) {
        return (
            <line
                x1={fromX}
                y1={fromY}
                x2={toX}
                y2={toY}
                stroke={color}
                strokeWidth={EDGE_THICKNESS}
            />
        );
    }

    const linkGridCell: IGridCell = {
        row: to.cell.row - 1,
        column: from.cell.column,
    };
    const { x: linkX, y: linkY } = toPoint(linkGridCell);
    const midpointY = (linkY + toY) / 2;

    return (
        <g>
            <line
                x1={fromX}
                y1={fromY}
                x2={linkX}
                y2={linkY + VERTICE_RADIUS}
                stroke={color}
                strokeWidth={EDGE_THICKNESS}
            />
            <path
                d={`
                M${linkX},${linkY + VERTICE_RADIUS}
                C${linkX},${midpointY}
                ${toX},${midpointY}
                ${toX},${toY - VERTICE_RADIUS}
                `}
                stroke={color}
                strokeWidth={EDGE_THICKNESS}
                fill="none"
            />
        </g>
    );
};

export default Edge;
