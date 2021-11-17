import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core";

import { useRepositoryContext } from "renderer/app/global";
import { TableRow } from "./react-table/types";

const useStyles = makeStyles<Theme, { graphWidth: string | number }>(
    (theme) => ({
        placeholder: {
            display: "inline-block",
            width: (props) => props.graphWidth,
        },
        wrapper: {
            display: "inline-block",
            width: (props) => `calc(100% - ${props.graphWidth})`,
            height: "5em",
            backgroundColor: theme.vscode.background.secondary,
        },
    })
);

interface ExpandedRowProps {
    row: TableRow;
}

const ExpandedRow: React.FC<ExpandedRowProps> = ({ row }) => {
    const graphWidth = row.cells[0].getCellProps().style.width;
    const classes = useStyles({ graphWidth });

    const { repository } = useRepositoryContext();
    const commit = repository.commits.commits[parseInt(row.id)];

    return (
        <div>
            <div className={classes.placeholder} />
            <div className={classes.wrapper}>{commit.oid}</div>
        </div>
    );
};

export default ExpandedRow;
