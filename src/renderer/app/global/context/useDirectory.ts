import { useState, useEffect } from "react";

import { IpcRendererGuard } from "renderer/app/utils/ipc";
import { RendererIpcSuccessCallback } from "renderer/app/utils/ipc/IpcRendererGuard";

type IDirectory = [string, () => void];
type IUseDirectory = () => IDirectory;

const useDirectory: IUseDirectory = () => {
    const [directory, setDirectory] = useState<string>(null);

    const eventCallback: RendererIpcSuccessCallback<[string]> = (directory) => {
        setDirectory(directory);
    };

    useEffect(() => {
        IpcRendererGuard.on("selectDirectory", eventCallback);

        return () => {
            IpcRendererGuard.removeListener("selectDirectory", eventCallback);
        };
    }, []);

    const selectDirectory: (directory?: string) => void = (directory) => {
        if (directory !== undefined) {
            setDirectory(directory);
        } else {
            IpcRendererGuard.send("selectDirectory");
        }
    };

    return [directory, selectDirectory];
};

export default useDirectory;
