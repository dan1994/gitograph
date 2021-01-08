import * as React from "react";

import { IVertice } from "renderer/app/graph/types";
import { toPoint, VERTICE_RADIUS } from "renderer/app/graph/utils";

interface VerticeProps {
    vertice: IVertice;
}

const Vertice: React.FC<VerticeProps> = ({ vertice }) => {
    const { cell, color } = vertice;
    const { x, y } = toPoint(cell);

    return <circle cx={x} cy={y} r={VERTICE_RADIUS} fill={color} />;
};

export default Vertice;
