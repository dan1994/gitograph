import { BrowserWindow, app, dialog } from "electron";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

import IpcMainWrapper, { IpcMainCallback } from "main/ipc/IpcMainWrapper";
import RepoWatcher from "main/repoWatcher/RepoWatcher";

const registerIpcChannels: (window: BrowserWindow) => void = (window) => {
    IpcMainWrapper.register(window, "exitApp", exitApp);
    IpcMainWrapper.register(window, "minimizeWindow", minimizeWindow);
    IpcMainWrapper.register(window, "selectDirectory", selectDirectory);
    IpcMainWrapper.register(window, "relaunchApp", relaunchApp);
    IpcMainWrapper.register(window, "runCommand", runCommand);
    IpcMainWrapper.register(window, "watchRepository", watchRepository);
};

const exitApp: IpcMainCallback = () => {
    app.quit();
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

const relaunchApp: IpcMainCallback = () => {
    app.relaunch();
    app.quit();
};

const runCommand: IpcMainCallback<[string], string> = async (
    _window,
    command
) => {
    const { stdout } = await execAsync(command);
    return stdout;
};

const repoWatcher = new RepoWatcher();
const watchRepository: IpcMainCallback<[string], boolean> = (
    _window,
    directory
) => {
    if (directory === repoWatcher.directory) {
        return repoWatcher.didChangeOccur();
    }

    void repoWatcher.watch(directory);
    return false;
};

export default registerIpcChannels;
