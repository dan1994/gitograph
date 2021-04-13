import { BrowserWindow, app, dialog } from "electron";

import IpcMainWrapper, { IpcMainCallback } from "main/ipc/IpcMainWrapper";

const registerIpcChannels: (window: BrowserWindow) => void = (window) => {
    IpcMainWrapper.register(window, "exitApp", exitApp);
    IpcMainWrapper.register(window, "minimizeWindow", minimizeWindow);
    IpcMainWrapper.register(window, "selectDirectory", selectDirectory);
};

export const exitApp: IpcMainCallback = () => {
    app.exit();
};

export const minimizeWindow: IpcMainCallback = (window) => {
    window.minimize();
};

export const selectDirectory: IpcMainCallback<string> = async (window) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(window, {
        properties: ["openDirectory"],
    });

    if (canceled) {
        return;
    }

    const directory = filePaths[0];
    return directory;
};

export default registerIpcChannels;
