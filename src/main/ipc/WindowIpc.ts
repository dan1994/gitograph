import { BrowserWindow, ipcMain } from "electron";

export type IpcCallback<T = void> = (
    window: BrowserWindow,
    event: Electron.IpcMainEvent
) => T | Promise<T>;

class WindowIpc {
    private readonly window: BrowserWindow;

    constructor(window: BrowserWindow) {
        this.window = window;
    }

    public register: <T>(callback: IpcCallback<T>, name?: string) => void = (
        callback,
        name
    ) => {
        const eventName = name || callback.name;
        ipcMain.on(eventName, (event) => {
            const result = callback(this.window, event);

            if (this.isAsync(result)) {
                void (async () => {
                    const value = await ((result as unknown) as Promise<unknown>);
                    if (result !== undefined) {
                        event.reply(eventName, value);
                    }
                })();
            } else {
                if (result !== undefined) {
                    event.returnValue = result;
                }
            }
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private isAsync: (value: any) => boolean = (value) => {
        return value === Object(value) && "then" in value;
    };
}

export default WindowIpc;
