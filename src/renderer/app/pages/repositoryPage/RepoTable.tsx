import * as React from "react";
import { useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Column } from "react-table";
import ReactMarkdown from "react-markdown";
import emoji from "node-emoji";

import { useRepositoryContext } from "renderer/app/global";

import { useFullWidthLayout } from "renderer/app/pages/repositoryPage/react-table/useFullWidthLayout";
import { useSyncSizeWithGraph } from "renderer/app/pages/repositoryPage/react-table/useSyncSizesWithGraph";
import { TableRecord } from "renderer/app/pages/repositoryPage/react-table/types";
import Table from "renderer/app/pages/repositoryPage/react-table/Table";

import CommitGraph from "renderer/app/pages/repositoryPage/graph/CommitGraph";
import { ROW_HEIGHT } from "renderer/app/pages/repositoryPage/graph/utils";
import Commits from "renderer/app/global/context/Commits";

const useStyles = makeStyles({
    top: {
        display: "block",
        overflow: "auto",
    },
    graphContainer: {
        position: "absolute",
        zIndex: 2,
        marginTop: 1.2 * ROW_HEIGHT,
    },
});

interface ColumnOptions {
    widthPrecentage?: number;
    center?: boolean;
}

const columns: (Column<TableRecord> & ColumnOptions)[] = [
    {
        Header: "Graph",
        accessor: "graph",
        widthPrecentage: 20,
    },
    {
        Header: "Message",
        accessor: "message",
        widthPrecentage: 45,
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
        widthPrecentage: 12,
        center: true,
    },
    {
        Header: "Hash",
        accessor: "hash",
        widthPrecentage: 8,
        center: true,
    },
];

const defaultColumn = {
    minWidth: 150,
    maxWidth: 5000,
};

const RepoTable: React.FC = () => {
    const classes = useStyles();

    const { commits } = useRepositoryContext();
    const data = useMemo<TableRecord[]>(
        () =>
            commits.commits.map((commit) => ({
                graph: "",
                message: (
                    <ReactMarkdown>
                        {emoji.emojify(commit.message.split("\n")[0])}
                    </ReactMarkdown>
                ),
                committer: commit.committer.name,
                time: Commits.getFormattedDate(commit),
                hash: Commits.abbreviate(commit.oid),
            })),
        [commits]
    );

    const [graphWidth, setGraphWidth] = useState<number>(150);
    const onResize: (widths: number[]) => void = (widths) => {
        if (graphWidth !== widths[0]) {
            setGraphWidth(widths[0]);
        }
    };

    return (
        <div className={classes.top}>
            <div className={classes.graphContainer}>
                <CommitGraph commits={commits} maxWidth={graphWidth} />
            </div>
            <Table
                id="repoTable"
                columns={columns}
                data={data}
                defaultColumn={defaultColumn}
                plugins={[useFullWidthLayout, useSyncSizeWithGraph]}
                onResize={onResize}
            />
        </div>
    );
};

export default RepoTable;
