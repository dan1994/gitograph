import { IpcRendererGuard } from "renderer/app/utils/ipc";
import { RendererIpcSuccessCallback } from "renderer/app/utils/ipc/IpcRendererGuard";

class CommandRunner {
    public static run: (command: string) => Promise<string> = (command) => {
        return new Promise<string>((resolve) => {
            const successCallback: RendererIpcSuccessCallback<[string]> = (
                results
            ) => {
                IpcRendererGuard.removeListener("runCommand", successCallback);
                resolve(results);
            };
            IpcRendererGuard.on("runCommand", successCallback);
            IpcRendererGuard.send("runCommand", command);
        });
    };
}

export default CommandRunner;
