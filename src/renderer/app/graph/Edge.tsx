import * as React from "react";

import { IEdge, IGridCell } from "renderer/app/graph/types";
import {
    EDGE_THICKNESS,
    toPoint,
    VERTICE_RADIUS,
} from "renderer/app/graph/utils";

const belowVertice: (y: number) => number = (y) => y + VERTICE_RADIUS;
const aboveVertice: (y: number) => number = (y) => y - VERTICE_RADIUS;

interface EdgeProps {
    edge: IEdge;
}

const StraightEdge: React.FC<EdgeProps> = ({ edge }) => {
    const { from, to } = edge;
    const { x, y: fromY } = toPoint(from.cell);
    const { y: toY } = toPoint(to.cell);
    const { color } = from;

    return (
        <line
            x1={x}
            y1={belowVertice(fromY)}
            x2={x}
            y2={aboveVertice(toY)}
            stroke={color}
            strokeWidth={EDGE_THICKNESS}
        />
    );
};

const SplitEdge: React.FC<EdgeProps> = ({ edge }) => {
    const { from, to } = edge;
    const { x: fromX, y: fromY } = toPoint(from.cell);
    const { x: toX, y: toY } = toPoint(to.cell);
    const { color } = from;

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
                y1={belowVertice(fromY)}
                x2={linkX}
                y2={belowVertice(linkY)}
                stroke={color}
                strokeWidth={EDGE_THICKNESS}
            />
            <path
                d={`
                M${linkX},${belowVertice(linkY)}
                C${linkX},${midpointY}
                ${toX},${midpointY}
                ${toX},${aboveVertice(toY)}
                `}
                stroke={color}
                strokeWidth={EDGE_THICKNESS}
                fill="none"
            />
        </g>
    );
};

const MergeEdge: React.FC<EdgeProps> = ({ edge }) => {
    const { from, to } = edge;
    const { x: fromX, y: fromY } = toPoint(from.cell);
    const { x: toX, y: toY } = toPoint(to.cell);
    const { color } = to;

    const linkGridCell: IGridCell = {
        row: from.cell.row + 1,
        column: to.cell.column,
    };
    const { x: linkX, y: linkY } = toPoint(linkGridCell);
    const midpointY = (fromY + linkY) / 2;

    return (
        <g>
            <path
                d={`
                M${fromX},${belowVertice(fromY)}
                C${fromX},${midpointY}
                ${linkX},${midpointY}
                ${linkX},${aboveVertice(linkY)}
                `}
                stroke={color}
                strokeWidth={EDGE_THICKNESS}
                fill="none"
            />
            <line
                x1={linkX}
                y1={aboveVertice(linkY)}
                x2={toX}
                y2={aboveVertice(toY)}
                stroke={color}
                strokeWidth={EDGE_THICKNESS}
            />
        </g>
    );
};

const Edge: React.FC<EdgeProps> = ({ edge }) => {
    const { from, to } = edge;

    const { x: fromX } = toPoint(from.cell);
    const { x: toX } = toPoint(to.cell);

    if (fromX === toX) {
        return <StraightEdge edge={edge} />;
    }

    if (fromX > toX) {
        return <SplitEdge edge={edge} />;
    }

    return <MergeEdge edge={edge} />;
};

export default Edge;
