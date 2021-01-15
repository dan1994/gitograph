import * as React from "react";
import {
    Table,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
    makeStyles,
} from "@material-ui/core";

import { useRepositoryContext } from "./store/Repository";
import CommitGraph from "./graph/CommitGraph";

const useStyles = makeStyles({
    tableRow: {
        height: 60,
    },
    tableCell: {
        fontSize: 18,
    },
});

const RepoTable: React.FC = () => {
    const classes = useStyles();
    const columns = ["Graph", "Message", "Commiter", "Time"];
    const { inRepository, commits } = useRepositoryContext();

    if (!inRepository()) {
        return <></>;
    }

    return (
        <Table stickyHeader>
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell key={column} align="center">
                            {column}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow className={classes.tableRow}>
                    <TableCell rowSpan={Object.values(commits).length}>
                        <CommitGraph />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        {Object.values(commits)[0].message.split("\n")[0]}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                        {Object.values(commits)[0].committer.name}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                        {Object.values(commits)[0].committer.timestamp}
                    </TableCell>
                </TableRow>
                {Object.entries(commits)
                    .slice(1)
                    .map(([oid, { message, committer }]) => (
                        <TableRow key={oid} className={classes.tableRow}>
                            <TableCell className={classes.tableCell}>
                                {message.split("\n")[0]}
                            </TableCell>
                            <TableCell
                                align="center"
                                className={classes.tableCell}
                            >
                                {committer.name}
                            </TableCell>
                            <TableCell
                                align="center"
                                className={classes.tableCell}
                            >
                                {committer.timestamp}
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};

export default RepoTable;
