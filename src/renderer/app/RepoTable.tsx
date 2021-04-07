import * as React from "react";
import { useMemo } from "react";
import { makeStyles } from "@material-ui/core";
import { Column, useTable, useResizeColumns, useFlexLayout } from "react-table";

import { useRepositoryContext } from "renderer/app/store/Repository";
import CommitGraph from "renderer/app/graph/CommitGraph";
import { TableRecord } from "renderer/app/react-table/types";
import Table from "renderer/app/react-table/Table";
import Commits from "./store/hooks/Commits";

const useStyles = makeStyles({
    top: {
        display: "block",
        overflow: "auto",
    },
    graphContainer: {
        position: "absolute",
        zIndex: 2,
        marginTop: "53.6px",
        paddingTop: "20px",
    },
});

const RepoTable: React.FC = () => {
    const classes = useStyles();

    const columns = useMemo<Column<TableRecord>[]>(
        () => [
            { Header: "Graph", accessor: "graph", width: 300 },
            { Header: "Message", accessor: "message", width: 700 },
            {
                Header: "Committer",
                accessor: "committer",
                width: 200,
                center: true,
            },
            { Header: "Time", accessor: "time", width: 80, center: true },
            { Header: "Hash", accessor: "hash", width: 80, center: true },
        ],
        []
    );
    const { commits } = useRepositoryContext();

    const data = useMemo<TableRecord[]>(
        () =>
            commits.commits
                // TODO - Partial load
                .slice(0, 30)
                .map((commit) => ({
                    graph: "",
                    message: commit.message.split("\n")[0],
                    committer: commit.committer.name,
                    time: Commits.getFormattedDate(commit),
                    hash: Commits.abbreviate(commit.oid),
                })),
        [commits]
    );

    const defaultColumn = useMemo(
        () => ({
            minWidth: 150,
            maxWidth: 5000,
        }),
        []
    );

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
        useResizeColumns,
        useFlexLayout
    );

    return (
        <div className={classes.top}>
            <div className={classes.graphContainer}>
                {/* TODO - Dynamic setting of width */}
                <CommitGraph commits={commits} maxWidth={150} />
            </div>
            <Table
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                rows={rows}
                prepareRow={prepareRow}
            />
        </div>
    );
};

export default RepoTable;
