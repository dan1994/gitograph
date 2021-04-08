import React from "react";
import { makeStyles } from "@material-ui/core";

import {
    GetTableBodyPropsFunction,
    GetTablePropsFunction,
    TableHeaderGroup,
    TableRow,
} from "renderer/app/react-table/types";
import Header from "renderer/app/react-table/Header";
import Body from "renderer/app/react-table/Body";
import { OnDragFunc } from "./useResizeable";

const useStyles = makeStyles({
    table: {},
});

interface TableProps {
    getTableProps: GetTablePropsFunction;
    getTableBodyProps: GetTableBodyPropsFunction;
    headerGroups: TableHeaderGroup[];
    rows: TableRow[];
    prepareRow: (row: TableRow) => void;
    widths: string[];
    onDrag: (index: number) => OnDragFunc;
}

const Table: React.FC<TableProps> = ({
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    widths,
    onDrag,
    ...rest
}) => {
    const { table } = useStyles();

    return (
        <div className={table} {...getTableProps()} {...rest}>
            <Header
                headerGroups={headerGroups}
                widths={widths}
                onDrag={onDrag}
            />
            <Body
                getTableBodyProps={getTableBodyProps}
                widths={widths}
                rows={rows}
                prepareRow={prepareRow}
            />
        </div>
    );
};

export default Table;
