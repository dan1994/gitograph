import React from "react";
import { makeStyles } from "@material-ui/core";

import { TableHeaderGroup } from "renderer/app/react-table/types";
import Resizer from "renderer/app/react-table/Resizer";
import { OnDragFunc } from "./useResizeable";

const useStyles = makeStyles({
    headerCell: {
        margin: 0,
        padding: "0.5rem",
        position: "relative",
        borderRight: "1px solid #4a4741",
        "&:last-child": {
            borderRight: 0,
        },

        fontSize: "1.75rem",
        fontWeight: "bold",
        textAlign: "center",
        background: "#383631",
        boxSizing: "border-box",
    },
});

interface HeaderCellProps {
    column: TableHeaderGroup;
    width: string;
    isResizeable: boolean;
    onDrag: OnDragFunc;
}

const HeaderCell: React.FC<HeaderCellProps> = ({
    column,
    width,
    isResizeable,
    onDrag,
    ...rest
}) => {
    const { headerCell } = useStyles();

    const { style, ...other } = column.getHeaderProps();
    style.width = width;

    return (
        <div {...other} style={style} className={headerCell} {...rest}>
            {column.render("Header")}
            {isResizeable && <Resizer onDrag={onDrag} />}
        </div>
    );
};

export default HeaderCell;
