import { useState } from "react";

import { IpcRendererGuard } from "renderer/app/utils/ipc";

type IDirectory = [string, () => void];
type IUseDirectory = () => IDirectory;

const useDirectory: IUseDirectory = () => {
    const [directory, setDirectory] = useState<string>(null);

    const selectDirectory: (directory?: string) => void = async (directory) => {
        if (directory !== undefined) {
            setDirectory(directory);
        } else {
            setDirectory(
                await IpcRendererGuard.send<[], string>("selectDirectory")
            );
        }
    };

    return [directory, selectDirectory];
};

export default useDirectory;
