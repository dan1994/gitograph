import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Column, useTable } from "react-table";

import { useRepositoryContext } from "renderer/app/store/Repository";
import CommitGraph from "renderer/app/graph/CommitGraph";
import { TableRecord } from "renderer/app/react-table/types";
import Table from "renderer/app/react-table/Table";
import Commits from "./store/hooks/Commits";
import { useFullWidthLayout } from "./react-table/useFullWidthLayout";

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

const getGraphColumnWidth = () => {
    const cellElement = document.querySelectorAll('[role="columnheader"]')[0];
    return cellElement.getBoundingClientRect().width;
};

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

    const [widths, setWidths] = useState<string[]>(
        columns.map((column) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            const widthPrecentage: number | undefined = (column as any)
                .widthPrecentage;
            return widthPrecentage
                ? `${widthPrecentage}%`
                : `${100 / columns.length}%`;
        })
    );

    const onDrag = (index: number) => (width1: number, width2: number) => {
        const newWidths = [...widths];
        newWidths[index] = `${width1}px`;
        newWidths[index + 1] = `${width2}px`;
        setWidths(newWidths);
    };

    const [graphWidth, setGraphWidth] = useState<number>(0);
    useEffect(() => {
        setGraphWidth(getGraphColumnWidth());
    }, [widths]);

    return (
        <div className={classes.top}>
            <div className={classes.graphContainer}>
                {/* TODO - Dynamic setting of width */}
                <CommitGraph commits={commits} maxWidth={graphWidth} />
            </div>
            <Table
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                rows={rows}
                prepareRow={prepareRow}
                widths={widths}
                onDrag={onDrag}
            />
        </div>
    );
};

export default RepoTable;
