import React from "react";
import { makeStyles } from "@material-ui/core";

import {
    GetTableBodyPropsFunction,
    GetTablePropsFunction,
    TableHeaderGroup,
    TableRow,
} from "renderer/app/react-table/types";
import {
    Column,
    ResizeableColumnsContextProvider,
} from "renderer/app/react-table/useResizeableColumns";
import Header from "renderer/app/react-table/Header";
import Body from "renderer/app/react-table/Body";

const useStyles = makeStyles({
    table: {},
});

interface TableProps {
    id: string;
    getTableProps: GetTablePropsFunction;
    getTableBodyProps: GetTableBodyPropsFunction;
    headerGroups: TableHeaderGroup[];
    rows: TableRow[];
    prepareRow: (row: TableRow) => void;
}

const Table: React.FC<TableProps> = ({
    id,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
}) => {
    const { table } = useStyles();

    const columns = headerGroups[0].headers as Column[];

    return (
        <ResizeableColumnsContextProvider id={id} columns={columns}>
            <div id={id} className={table} {...getTableProps()}>
                <Header headerGroups={headerGroups} />
                <Body
                    getTableBodyProps={getTableBodyProps}
                    rows={rows}
                    prepareRow={prepareRow}
                />
            </div>
        </ResizeableColumnsContextProvider>
    );
};

export default Table;
