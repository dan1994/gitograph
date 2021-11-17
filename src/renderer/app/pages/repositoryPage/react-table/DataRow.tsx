import React from "react";
import { makeStyles } from "@material-ui/core";

import { TableRow } from "renderer/app/pages/repositoryPage/react-table/types";
import DataCell from "renderer/app/pages/repositoryPage/react-table/DataCell";
import ExpandedRow from "../ExpandedRow";

const useStyles = makeStyles((theme) => ({
    dataRow: {
        "&:hover": {
            backgroundColor: theme.vscode.background.hover,
        },
    },
}));

interface DataRowProps {
    row: TableRow;
}

const DataRow: React.FC<DataRowProps> = ({ row }) => {
    const { dataRow } = useStyles();

    const { style: style1 } = row.getRowProps();
    const { style: style2 } = row.getToggleRowExpandedProps();
    const style = { ...style1, ...style2 };

    return (
        <>
            <div
                {...row.getRowProps()}
                {...row.getToggleRowExpandedProps()}
                style={style}
                className={dataRow}
            >
                {row.cells.map((cell, index) => (
                    <DataCell
                        key={cell.column.id}
                        cell={cell}
                        columnIndex={index}
                    />
                ))}
            </div>
            {row.isExpanded && <ExpandedRow row={row} />}
        </>
    );
};

export default DataRow;
