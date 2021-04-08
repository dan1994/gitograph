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
    widths: string[];
}

const DataRow: React.FC<DataRowProps> = ({ row, widths, ...rest }) => {
    const { dataRow } = useStyles();

    return (
        <div {...row.getRowProps()} className={dataRow} {...rest}>
            {row.cells.map((cell, index) => (
                <DataCell
                    key={cell.column.id}
                    cell={cell}
                    width={widths[index]}
                />
            ))}
        </div>
    );
};

export default DataRow;
