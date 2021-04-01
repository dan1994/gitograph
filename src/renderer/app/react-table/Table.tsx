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

const useStyles = makeStyles({
    table: {},
});

interface TableProps {
    getTableProps: GetTablePropsFunction;
    getTableBodyProps: GetTableBodyPropsFunction;
    headerGroups: TableHeaderGroup[];
    rows: TableRow[];
    prepareRow: (row: TableRow) => void;
}

const Table: React.FC<TableProps> = ({
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    ...rest
}) => {
    const { table } = useStyles();

    return (
        <div className={table} {...getTableProps()} {...rest}>
            <Header headerGroups={headerGroups} />
            <Body
                getTableBodyProps={getTableBodyProps}
                rows={rows}
                prepareRow={prepareRow}
            />
        </div>
    );
};

export default Table;
