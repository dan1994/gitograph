import React from "react";
import { makeStyles } from "@material-ui/core";
import { useResizeable, OnDragFunc } from "./useResizeable";

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
    onDrag: OnDragFunc;
}

const Resizer: React.FC<ResizerProps> = ({ onDrag, ...rest }) => {
    const { resizer } = useStyles();

    const resizerProps = useResizeable(onDrag);

    return <div {...resizerProps} className={resizer} {...rest} />;
};

export default Resizer;
