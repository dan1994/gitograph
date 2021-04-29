import * as React from "react";

import {
    toPoint,
    VERTICE_RADIUS,
} from "renderer/app/pages/repositoryPage/graph/utils";
import { ICommit } from "renderer/app/utils/git/types";

interface VerticeProps {
    vertice: ICommit;
}

const Vertice: React.FC<VerticeProps> = ({ vertice }) => {
    const { color } = vertice;
    const { x, y } = toPoint(vertice);

    return <circle cx={x} cy={y} r={VERTICE_RADIUS} fill={color} />;
};

export default Vertice;
