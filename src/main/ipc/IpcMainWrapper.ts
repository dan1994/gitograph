import { BrowserWindow, ipcMain } from "electron";

import { ChannelName } from "shared/ipc/channels";

export type IpcMainCallback<T = void> = (
    window: BrowserWindow,
    event: Electron.IpcMainEvent,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
) => T | Promise<T>;

class IpcMainWrapper {
    public static register: <T>(
        window: BrowserWindow,
        channel: ChannelName,
        callback: IpcMainCallback<T>
    ) => void = (window, channel, callback) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ipcMain.on(channel, (event, ...args: any[]) => {
            const result = callback(window, event, ...args);

            if (IpcMainWrapper.isAsync(result)) {
                void (async () => {
                    const value = await ((result as unknown) as Promise<unknown>);
                    if (result !== undefined) {
                        event.reply(channel, value);
                    }
                })();
            } else {
                if (result !== undefined) {
                    event.reply(channel, result);
                }
            }
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static isAsync: (value: any) => boolean = (value) => {
        return value === Object(value) && "then" in value;
    };
}

export default IpcMainWrapper;
