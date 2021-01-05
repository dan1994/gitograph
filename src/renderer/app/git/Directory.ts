import { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import { IpcRendererEvent } from "electron/main";

type IpcRendererCallback = (event: IpcRendererEvent, ...args: any[]) => void;

type IUseDirectory = () => [string, () => void];

const useDirectory: IUseDirectory = () => {
    const [directory, setDirectory] = useState<string>("");

    const eventCallback: IpcRendererCallback = (_, ...args) => {
        const directory = args[0];
        setDirectory(directory);
    };

    useEffect(() => {
        ipcRenderer.on("selectDirectory", eventCallback);

        return () => {
            ipcRenderer.removeListener("selectDirectory", eventCallback);
        };
    }, []);

    const selectDirectory = () => {
        ipcRenderer.send("selectDirectory");
    };

    return [directory, selectDirectory];
};

export default useDirectory;
