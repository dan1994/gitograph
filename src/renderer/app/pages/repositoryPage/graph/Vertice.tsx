import * as React from "react";

import { IVertice } from "renderer/app/pages/repositoryPage/graph/types";
import {
    toPoint,
    VERTICE_RADIUS,
} from "renderer/app/pages/repositoryPage/graph/utils";

interface VerticeProps {
    vertice: IVertice;
}

const Vertice: React.FC<VerticeProps> = ({ vertice }) => {
    const { color } = vertice;
    const { x, y } = toPoint(vertice);

    return <circle cx={x} cy={y} r={VERTICE_RADIUS} fill={color} />;
};

export default Vertice;
