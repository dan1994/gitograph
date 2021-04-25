import { BrowserWindow, app, dialog } from "electron";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

import IpcMainWrapper, { IpcMainCallback } from "main/ipc/IpcMainWrapper";

const registerIpcChannels: (window: BrowserWindow) => void = (window) => {
    IpcMainWrapper.register(window, "exitApp", exitApp);
    IpcMainWrapper.register(window, "minimizeWindow", minimizeWindow);
    IpcMainWrapper.register(window, "selectDirectory", selectDirectory);
    IpcMainWrapper.register(window, "runCommand", runCommand);
};

const exitApp: IpcMainCallback = () => {
    app.exit();
};

const minimizeWindow: IpcMainCallback = (window) => {
    window.minimize();
};

const selectDirectory: IpcMainCallback<[], string> = async (window) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(window, {
        properties: ["openDirectory"],
    });

    if (canceled) {
        return;
    }

    const directory = filePaths[0];
    return directory;
};

const runCommand: IpcMainCallback<[string], string> = async (
    _window,
    command
) => {
    const { stdout } = await execAsync(command);
    return stdout;
};

export default registerIpcChannels;
