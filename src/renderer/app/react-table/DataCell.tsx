import React from "react";
import { makeStyles } from "@material-ui/core";
import { CellPropGetter } from "react-table";

import { TableCell, TableRecord } from "renderer/app/react-table/types";

const useStyles = makeStyles({
    dataCell: {
        margin: 0,
        padding: "0.5rem",
        borderRight: "1px solid #4a4741",
        "&:last-child": {
            borderRight: 0,
        },

        overflow: "hidden",
        whiteSpace: "nowrap",
        fontSize: "1.25rem",
        height: 70,
    },
});

interface DataCellProps {
    cell: TableCell;
    width: string;
}

const cellProps: CellPropGetter<TableRecord> = (props, { cell }) => {
    // Ugly hack to make typescript believe this conversion is legit
    const { center } = (cell.column as unknown) as {
        center: boolean | undefined;
    };

    return [
        props,
        {
            style: {
                display: "flex",
                alignItems: "center",
                justifyContent: center ? "center" : "flex-start",
                boxSizing: "border-box",
            },
        },
    ];
};

const DataCell: React.FC<DataCellProps> = ({ cell, width, ...rest }) => {
    const { dataCell } = useStyles();

    const { style, ...other } = cell.getCellProps(cellProps);
    style.width = width;

    return (
        <div {...other} style={style} className={dataCell} {...rest}>
            {cell.render("Cell")}
        </div>
    );
};

export default DataCell;
