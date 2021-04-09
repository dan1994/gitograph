import React from "react";
import { makeStyles } from "@material-ui/core";
import { Column, useTable, PluginHook } from "react-table";

import { TableRecord } from "renderer/app/react-table/types";
import {
    ColumnOptions,
    ResizeableColumnsContextProvider,
} from "renderer/app/react-table/useResizeableColumns";
import Header from "renderer/app/react-table/Header";
import Body from "renderer/app/react-table/Body";

const useStyles = makeStyles({
    table: {},
});

interface TableProps {
    id: string;
    columns: Column<TableRecord>[];
    data: TableRecord[];
    defaultColumn: Partial<Column<TableRecord>>;
    plugins: PluginHook<TableRecord>[];
}

const Table: React.FC<TableProps> = ({
    id,
    columns,
    data,
    defaultColumn,
    plugins,
}) => {
    const { table } = useStyles();

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<TableRecord>(
        {
            columns,
            data,
            defaultColumn,
        },
        ...plugins
    );

    const columnsOptions = headerGroups[0].headers as ColumnOptions[];

    return (
        <ResizeableColumnsContextProvider id={id} columns={columnsOptions}>
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
