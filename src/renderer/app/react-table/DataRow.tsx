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

const DataRow: React.FC<DataRowProps> = ({ row, ...rest }) => {
    const { dataRow } = useStyles();

    return (
        <div {...row.getRowProps()} className={dataRow} {...rest}>
            {row.cells.map((cell) => (
                <DataCell key={cell.column.id} cell={cell} />
            ))}
        </div>
    );
};

export default DataRow;
