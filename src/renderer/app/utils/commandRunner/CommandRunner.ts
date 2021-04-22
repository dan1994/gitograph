import { IpcRendererWrapper } from "renderer/app/utils/ipc";

class CommandRunner {
    public static run: (command: string) => Promise<string> = (command) => {
        return IpcRendererWrapper.send("runCommand", command);
    };
}

export default CommandRunner;
