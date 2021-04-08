import React from "react";
import { makeStyles } from "@material-ui/core";

import {
    GetTableBodyPropsFunction,
    TableRow,
} from "renderer/app/react-table/types";
import DataRow from "renderer/app/react-table/DataRow";

const useStyles = makeStyles({
    body: {
        /* These styles are required for a scrollable table body */
        overflowY: "scroll",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
            display: "none",
        },
    },
});

interface BodyProps {
    getTableBodyProps: GetTableBodyPropsFunction;
    rows: TableRow[];
    widths: string[];
    prepareRow: (row: TableRow) => void;
}

const Body: React.FC<BodyProps> = ({
    getTableBodyProps,
    rows,
    widths,
    prepareRow,
    ...rest
}) => {
    const { body } = useStyles();

    return (
        <div className={body} {...getTableBodyProps()} {...rest}>
            {rows.map((row) => {
                prepareRow(row);
                return <DataRow key={row.id} row={row} widths={widths} />;
            })}
        </div>
    );
};

export default Body;
