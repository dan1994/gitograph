import * as React from "react";

import {
    toPoint,
    VERTICE_RADIUS,
    EDGE_THICKNESS,
} from "renderer/app/pages/repositoryPage/graph/utils";
import { Commits } from "renderer/app/utils/git";
import { ICommit } from "renderer/app/utils/git/types";

interface VerticeProps {
    commit: ICommit;
}

const Vertice: React.FC<VerticeProps> = ({ commit }) => {
    const { oid, color } = commit;
    const { x, y } = toPoint(commit);

    const fill = oid === Commits.UNCOMMITTED_CHANGES_OID ? "none" : color;

    return (
        <circle
            cx={x}
            cy={y}
            r={VERTICE_RADIUS}
            fill={fill}
            stroke={color}
            strokeWidth={EDGE_THICKNESS}
        />
    );
};

export default Vertice;
