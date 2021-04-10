import React from "react";
import { makeStyles } from "@material-ui/core";
import { TableHeaderGroup } from "renderer/app/react-table/types";

import { useResizeableColumnsContext } from "./useResizeableColumns";
import Resizer from "renderer/app/react-table/Resizer";

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
    columnIndex: number;
}

const HeaderCell: React.FC<HeaderCellProps> = ({ column, columnIndex }) => {
    const { headerCell } = useStyles();

    const { getCellProps } = useResizeableColumnsContext();

    const { style: style1, ...extraProps } = column.getHeaderProps();
    const { style: style2, isResizeable } = getCellProps(columnIndex);
    const style = { ...style1, ...style2 };

    return (
        <div {...extraProps} style={style} className={headerCell}>
            {column.render("Header")}
            {isResizeable && <Resizer columnIndex={columnIndex} />}
        </div>
    );
};

export default HeaderCell;
