import React from "react";
import { makeStyles } from "@material-ui/core";

import { TableRow } from "renderer/app/react-table/types";
import DataCell from "renderer/app/react-table/DataCell";

const useStyles = makeStyles({
    dataRow: {
        "&:hover": {
            backgroundColor: "#4a4741",
        },
    },
});

interface DataRowProps {
    row: TableRow;
}

const DataRow: React.FC<DataRowProps> = ({ row }) => {
    const { dataRow } = useStyles();

    return (
        <div {...row.getRowProps()} className={dataRow}>
            {row.cells.map((cell, index) => (
                <DataCell
                    key={cell.column.id}
                    cell={cell}
                    columnIndex={index}
                />
            ))}
        </div>
    );
};

export default DataRow;
