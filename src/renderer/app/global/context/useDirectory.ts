import { useState } from "react";

import { IpcRendererWrapper } from "renderer/app/utils/ipc";

type IDirectory = [string, (directory?: string) => Promise<void>];
type IUseDirectory = () => IDirectory;

const useDirectory: IUseDirectory = () => {
    const [directory, setDirectory] = useState<string>(null);

    const selectDirectory: (directory?: string) => Promise<void> = async (
        directory
    ) => {
        if (directory !== undefined) {
            setDirectory(directory);
        } else {
            setDirectory(await IpcRendererWrapper.send("selectDirectory"));
        }
    };

    return [directory, selectDirectory];
};

export default useDirectory;
