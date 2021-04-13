import { BrowserWindow } from "electron";

import WindowIpc from "main/ipc/WindowIpc";
import { exitApp, minimizeWindow, selectDirectory } from "main/ipc/events";

const createMainWindowIpc: (window: BrowserWindow) => WindowIpc = (window) => {
    const endpoint = new WindowIpc(window);

    endpoint.register(exitApp);
    endpoint.register(minimizeWindow);
    endpoint.register(selectDirectory);

    return endpoint;
};

export default createMainWindowIpc;
