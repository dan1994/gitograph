import { IpcRendererGuard } from "renderer/app/utils/ipc";

class CommandRunner {
    public static run: (command: string) => Promise<string> = (command) => {
        return IpcRendererGuard.send("runCommand", command);
    };
}

export default CommandRunner;
