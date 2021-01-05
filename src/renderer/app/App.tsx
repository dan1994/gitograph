import * as React from "react";
import { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { Button, Typography } from "@material-ui/core";

import useRepository from "renderer/app/git/Repository";
import GraphGenerator from "renderer/app/algorithm/GraphGenerator";
import DirectedGraph from "renderer/app/graph/DirectedGraph";

import { IDirectedGraph } from "./graph/types";

const App: React.FC = () => {
    const {
        rootDirectory,
        selectDirectory,
        log,
        inRepository,
    } = useRepository();

    const [graph, setGraph] = useState<IDirectedGraph>([]);

    const generateGraph: () => void = async () => {
        if (!inRepository()) {
            setGraph([]);
            return;
        }
        const commits = await log();
        const graphGenerator = new GraphGenerator(commits);
        setGraph(graphGenerator.generate());
    };

    useEffect(() => {
        generateGraph();
    }, [rootDirectory]);

    return (
        <>
            <React.StrictMode>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            selectDirectory();
                        }}
                    >
                        Select Repository
                    </Button>
                    <Typography variant="h5">
                        {inRepository()
                            ? `Repository: ${rootDirectory}`
                            : "No Repository Selected"}
                    </Typography>
                    <DirectedGraph graph={graph} />
                </div>
            </React.StrictMode>
        </>
    );
};

export default hot(module)(App);
