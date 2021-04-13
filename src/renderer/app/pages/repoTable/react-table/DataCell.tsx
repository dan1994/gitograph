import React from "react";
import { makeStyles } from "@material-ui/core";
import { CellPropGetter } from "react-table";

import {
    TableCell,
    TableRecord,
} from "renderer/app/pages/repoTable/react-table/types";
import { useResizeableColumnsContext } from "renderer/app/pages/repoTable/react-table/useResizeableColumns";
import { ITheme } from "renderer/app/global";

const useStyles = makeStyles((theme: ITheme) => ({
    dataCell: {
        margin: 0,
        padding: "0.5rem",
        borderRight: theme.vscode.border,
        "&:last-child": {
            borderRight: 0,
        },

        overflow: "hidden",
        whiteSpace: "nowrap",
        fontSize: "1.25rem",
        height: 70,
    },
}));

interface Cell {
    center?: boolean;
}

const cellProps: CellPropGetter<TableRecord> = (props, { cell }) => {
    const { center } = (cell.column as unknown) as Cell;

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

interface DataCellProps {
    cell: TableCell;
    columnIndex: number;
}

const DataCell: React.FC<DataCellProps> = ({ cell, columnIndex }) => {
    const { dataCell } = useStyles();

    const { getCellProps } = useResizeableColumnsContext();

    const { style: style1, ...extraProps } = cell.getCellProps(cellProps);
    const { style: style2 } = getCellProps(columnIndex);
    const style = { ...style1, ...style2 };

    return (
        <div {...extraProps} style={style} className={dataCell}>
            {cell.render("Cell")}
        </div>
    );
};

export default DataCell;
