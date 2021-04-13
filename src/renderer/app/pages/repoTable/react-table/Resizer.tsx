import React from "react";
import { makeStyles } from "@material-ui/core";

import { useResizeableColumnsContext } from "./useResizeableColumns";

const useStyles = makeStyles({
    resizer: {
        position: "absolute",
        right: 0,
        top: 0,
        transform: "translateX(5px)",
        width: "10px",
        height: "100%",
        zIndex: 1,
        /* prevents from scrolling while dragging on touch devices */
        touchAction: "none",
        cursor: "col-resize",
        caretColor: "transparent",
    },
});

interface ResizerProps {
    columnIndex: number;
}

const Resizer: React.FC<ResizerProps> = ({ columnIndex }) => {
    const { resizer } = useStyles();

    const { getResizerProps } = useResizeableColumnsContext();

    return <div {...getResizerProps(columnIndex)} className={resizer} />;
};

export default Resizer;
