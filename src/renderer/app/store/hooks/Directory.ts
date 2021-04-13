import { useState, useEffect } from "react";
import { IpcRendererEvent } from "electron";
import IpcRendererGuard from "renderer/ipc/IpcRendererGuard";

/*eslint @typescript-eslint/no-explicit-any: ["error", { "ignoreRestArgs": true }]*/
type IpcRendererCallback = (event: IpcRendererEvent, ...args: any[]) => void;

type IDirectory = [string, () => void];
type IUseDirectory = () => IDirectory;

const useDirectory: IUseDirectory = () => {
    const [directory, setDirectory] = useState<string>(null);

    const eventCallback: IpcRendererCallback = (_, ...args) => {
        if (typeof args[0] !== "string") {
            return;
        }

        const directory = args[0];
        setDirectory(directory);
    };

    useEffect(() => {
        IpcRendererGuard.on("selectDirectory", eventCallback);

        return () => {
            IpcRendererGuard.removeListener("selectDirectory", eventCallback);
        };
    }, []);

    const selectDirectory = () => {
        IpcRendererGuard.send("selectDirectory");
    };

    return [directory, selectDirectory];
};

export default useDirectory;
