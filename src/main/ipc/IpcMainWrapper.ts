import { BrowserWindow, ipcMain } from "electron";

import { ChannelName } from "shared/ipc/channels";

export type IpcMainCallback<Args extends unknown[] = [], Ret = void> = (
    window: BrowserWindow,
    ...args: Args
) => Ret | Promise<Ret>;

class IpcMainWrapper {
    public static register: <Args extends unknown[] = [], Ret = void>(
        window: BrowserWindow,
        channel: ChannelName,
        callback: IpcMainCallback<Args, Ret>
    ) => void = (window, channel, callback) => {
        ipcMain.on(channel, (event, ...args) => {
            const channelWrapper = new IpcMainEventChannelWrapper(
                event,
                channel,
                window
            );

            channelWrapper.execute(callback, ...args);
        });
    };
}

class IpcMainEventChannelWrapper {
    private event: Electron.IpcMainEvent;
    private channel: string;
    private window: BrowserWindow;

    constructor(
        event: Electron.IpcMainEvent,
        channel: string,
        window: BrowserWindow
    ) {
        this.event = event;
        this.channel = channel;
        this.window = window;
    }

    public execute: <Args extends unknown[], Ret>(
        callback: IpcMainCallback<Args, Ret>,
        ...args: unknown[]
    ) => void = async <Args extends unknown[], Ret>(
        callback: IpcMainCallback<Args, Ret>,
        ...args: unknown[]
    ) => {
        let [success, result] = this.guardCallback(callback, ...args);

        if (IpcMainEventChannelWrapper.isAsync(result)) {
            [success, result] = await IpcMainEventChannelWrapper.guardAwait(
                result as Promise<Ret>
            );
        }

        this.replyIfNecessary(success, result);
    };

    private guardCallback: <Args extends unknown[], Ret>(
        callback: IpcMainCallback<Args, Ret>,
        ...args: Args
    ) => [true, Ret | Promise<Ret>] | [false, Error] = (callback, ...args) => {
        try {
            return [true, callback(this.window, ...args)];
        } catch (error) {
            return [false, error];
        }
    };

    private static guardAwait: <Ret>(
        promise: Promise<Ret>
    ) => Promise<[true, Ret] | [false, Error]> = async (promise) => {
        try {
            return [true, await promise];
        } catch (error) {
            return [false, error];
        }
    };

    private replyIfNecessary: <Ret>(
        success: boolean,
        result: Ret | Error
    ) => void = (success, result) => {
        if (!success || result !== undefined) {
            this.event.reply(this.channel, success, result);
        }
    };

    private static isAsync: (value: unknown) => boolean = (value) => {
        return value === Object(value) && "then" in Object(value);
    };
}

export default IpcMainWrapper;
