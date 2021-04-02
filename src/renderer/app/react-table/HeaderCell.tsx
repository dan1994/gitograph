import React from "react";
import { makeStyles } from "@material-ui/core";

import { TableHeaderGroup } from "renderer/app/react-table/types";
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
    },
});

interface HeaderCellProps {
    column: TableHeaderGroup;
}

const HeaderCell: React.FC<HeaderCellProps> = ({ column, ...rest }) => {
    const { headerCell } = useStyles();

    return (
        <div {...column.getHeaderProps()} className={headerCell} {...rest}>
            {column.render("Header")}
            {column.canResize && <Resizer column={column} />}
        </div>
    );
};

export default HeaderCell;
