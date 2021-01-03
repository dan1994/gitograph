import * as React from "react";
import { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { Button, Typography } from "@material-ui/core";
import { ipcRenderer } from "electron";
import { IpcRendererEvent } from "electron/main";

import DirectedGraph from "renderer/app/graph/DirectedGraph";
import dummyRepository from "renderer/app/dummy";

// Electron
type IpcRendererCallback = (event: IpcRendererEvent, ...args: any[]) => void;

type UseDirectoryResult = [string, () => void];

const useDirectory: () => UseDirectoryResult = () => {
    const [directory, setDirectory] = useState<string>("");

    const eventCallback: IpcRendererCallback = (_, ...args) => {
        console.log("HERE");
        const directory = args[0];
        setDirectory(directory);
    };

    useEffect(() => {
        ipcRenderer.on("selectDirectory", eventCallback);

        return () => {
            ipcRenderer.removeListener("selectDirectory", eventCallback);
        };
    });

    const selectDirectory: () => void = () => {
        ipcRenderer.send("selectDirectory");
    };

    return [directory, selectDirectory];
};

// React
const App: React.FC = () => {
    const [directory, selectDirectory] = useDirectory();

    return (
        <>
            <React.StrictMode>
                <Button variant="contained" onClick={selectDirectory}>
                    Select Repository
                </Button>
                <Typography>Selected: {directory}</Typography>
                <DirectedGraph graph={dummyRepository} />
            </React.StrictMode>
        </>
    );
};

export default hot(module)(App);
