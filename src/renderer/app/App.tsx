import * as React from "react";
import { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { Button, Typography } from "@material-ui/core";

import useRepository from "renderer/app/store/Repository";
import GraphGenerator from "renderer/app/algorithm/GraphGenerator";
import DirectedGraph from "renderer/app/graph/DirectedGraph";

const App: React.FC = () => {
    const {
        selectDirectory,
        rootDirectory,
        inRepository,
        commits,
    } = useRepository();

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
                    {/* <DirectedGraph graph={graph} /> */}
                </div>
            </React.StrictMode>
        </>
    );
};

export default hot(module)(App);
