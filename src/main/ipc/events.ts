import { app, dialog } from "electron";
import { IpcCallback } from "main/ipc/WindowIpc";

export const exitApp: IpcCallback = () => {
    app.exit();
};

export const minimizeWindow: IpcCallback = (window) => {
    window.minimize();
};

export const selectDirectory: IpcCallback<string> = async (window) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(window, {
        properties: ["openDirectory"],
    });

    if (canceled) {
        return;
    }

    const directory = filePaths[0];
    return directory;
};
