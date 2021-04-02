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
            },
        },
    ];
};

const DataCell: React.FC<DataCellProps> = ({ cell, ...rest }) => {
    const { dataCell } = useStyles();

    return (
        <div {...cell.getCellProps(cellProps)} className={dataCell} {...rest}>
            {cell.render("Cell")}
        </div>
    );
};

export default DataCell;
