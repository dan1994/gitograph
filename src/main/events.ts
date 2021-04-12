import { app, ipcMain, dialog, BrowserWindow } from "electron";

type EventFunction = (window: BrowserWindow) => void;

const selectDirectory: EventFunction = (window) => {
    ipcMain.on("selectDirectory", (event: Electron.IpcMainEvent) => {
        void (async () => {
            const { canceled, filePaths } = await dialog.showOpenDialog(
                window,
                {
                    properties: ["openDirectory"],
                }
            );

            if (canceled) {
                return;
            }

            const directory = filePaths[0];
            event.reply("selectDirectory", directory);
        })();
    });
};

const exitApp: EventFunction = () => {
    ipcMain.on("exit", () => {
        app.quit();
    });
};

const minimizeApp: EventFunction = (window) => {
    ipcMain.on("minimize", () => {
        window.minimize();
    });
};

const events: EventFunction[] = [selectDirectory, exitApp, minimizeApp];

const applyEventsTo: (window: BrowserWindow) => void = (window) => {
    events.map((eventFunction) => {
        eventFunction(window);
    });
};

export default applyEventsTo;
