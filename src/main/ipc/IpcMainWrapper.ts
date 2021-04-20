import { BrowserWindow, ipcMain } from "electron";

import { ChannelName } from "shared/ipc/channels";

export type IpcMainCallback<T = void, Args extends Array<unknown> = []> = (
    window: BrowserWindow,
    event: Electron.IpcMainEvent,
    ...args: Args
) => T | Promise<T>;

class IpcMainWrapper {
    public static register: <T, Args extends Array<unknown> = []>(
        window: BrowserWindow,
        channel: ChannelName,
        callback: IpcMainCallback<T, Args>
    ) => void = <T, Args extends Array<unknown> = []>(
        window: BrowserWindow,
        channel: ChannelName,
        callback: IpcMainCallback<T, Args>
    ) => {
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

    public execute: <T, Args extends Array<unknown>>(
        callback: IpcMainCallback<T, Args>,
        ...args: unknown[]
    ) => void = async <T, Args extends Array<unknown>>(
        callback: IpcMainCallback<T, Args>,
        ...args: unknown[]
    ) => {
        let [success, result] = this.guardCallback(callback, ...args);

        if (IpcMainEventChannelWrapper.isAsync(result)) {
            [success, result] = await IpcMainEventChannelWrapper.guardAwait(
                result as Promise<T>
            );
        }

        this.replyIfNecessary(success, result);
    };

    private guardCallback: <T, Args extends Array<unknown>>(
        callback: IpcMainCallback<T, Args>,
        ...args: Args
    ) => [true, T | Promise<T>] | [false, string] = (callback, ...args) => {
        try {
            return [true, callback(this.window, this.event, ...args)];
        } catch (error) {
            return [false, error];
        }
    };

    private static guardAwait: <T>(
        promise: Promise<T>
    ) => Promise<[true, T] | [false, string]> = async (promise) => {
        try {
            return [true, await promise];
        } catch (error) {
            return [false, error];
        }
    };

    private replyIfNecessary: <T>(
        success: boolean,
        result: T | string
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
