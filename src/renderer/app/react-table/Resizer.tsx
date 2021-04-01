import React from "react";
import { makeStyles } from "@material-ui/core";
import { TableHeaderGroup } from "renderer/app/react-table/types";

const useStyles = makeStyles({
    resizer: {
        position: "absolute",
        right: 0,
        top: 0,
        width: "10px",
        height: "100%",
        zIndex: 1,
        /* prevents from scrolling while dragging on touch devices */
        touchAction: "none",
        cursor: "col-resize",
    },
});

interface ResizerProps {
    column: TableHeaderGroup;
}

const Resizer: React.FC<ResizerProps> = ({ column, ...rest }) => {
    const { resizer } = useStyles();

    return <div {...column.getResizerProps()} className={resizer} {...rest} />;
};

export default Resizer;
