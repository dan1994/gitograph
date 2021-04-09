import * as React from "react";
import { useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Column, useTable } from "react-table";

import { useRepositoryContext } from "renderer/app/store/Repository";

import { useFullWidthLayout } from "renderer/app/react-table/useFullWidthLayout";
import { TableRecord } from "renderer/app/react-table/types";
import Table from "renderer/app/react-table/Table";

import CommitGraph from "renderer/app/graph/CommitGraph";
import Commits from "renderer/app/store/hooks/Commits";

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
            {
                Header: "Graph",
                accessor: "graph",
                widthPrecentage: 20,
            },
            {
                Header: "Message",
                accessor: "message",
                widthPrecentage: 40,
            },
            {
                Header: "Committer",
                accessor: "committer",
                widthPrecentage: 15,
                center: true,
            },
            {
                Header: "Time",
                accessor: "time",
                widthPrecentage: 15,
                center: true,
            },
            {
                Header: "Hash",
                accessor: "hash",
                widthPrecentage: 10,
                center: true,
            },
        ],
        []
    );

    const { commits } = useRepositoryContext();
    const data = useMemo<TableRecord[]>(
        () =>
            commits.commits
                // TODO - Partial load
                .slice(0, 10)
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
        useFullWidthLayout
    );

    const [graphWidth, setGraphWidth] = useState<number>(150);

    return (
        <div className={classes.top}>
            <div className={classes.graphContainer}>
                {/* TODO - Dynamic setting of width */}
                <CommitGraph commits={commits} maxWidth={graphWidth} />
            </div>
            <Table
                id="repoTable"
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
