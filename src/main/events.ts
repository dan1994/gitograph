import { ipcMain, dialog, BrowserWindow } from "electron";

type EventFunction = (window: BrowserWindow) => void;

const selectDirectory: EventFunction = (window) => {
    ipcMain.on("selectDirectory", async (event, _) => {
        const { canceled, filePaths } = await dialog.showOpenDialog(window, {
            properties: ["openDirectory"],
        });

        const directory = canceled ? "" : filePaths[0];

        event.reply("selectDirectory", directory);
    });
};

const events: EventFunction[] = [selectDirectory];

const applyEventsTo: (window: BrowserWindow) => void = (window) => {
    events.map((eventFunction) => {
        eventFunction(window);
    });
};

export default applyEventsTo;
