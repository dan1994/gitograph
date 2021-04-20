import { ipcRenderer } from "electron";
import { ChannelName } from "shared/ipc/channels";

type RendererIpcCallback = (
    event: Electron.IpcRendererEvent,
    success: boolean,
    ...args: unknown[]
) => void;

export type RendererIpcSuccessCallback<Args extends Array<unknown> = []> = (
    ...args: Args
) => void;

export type RendererIpcErrorCallback = (
    error: Error,
    channel: ChannelName
) => void;

type CallbackPair = [RendererIpcCallback, RendererIpcSuccessCallback];

interface RegisteredCallbacks {
    [channel: string]: CallbackPair[];
}

class IpcRendererGuard {
    private static registeredCallbacks: RegisteredCallbacks = {};

    public static on: <Args extends Array<unknown> = []>(
        channel: ChannelName,
        successCallback: RendererIpcSuccessCallback<Args>,
        errorCallback?: RendererIpcErrorCallback
    ) => void = <Args extends Array<unknown> = []>(
        channel: ChannelName,
        successCallback: RendererIpcSuccessCallback<Args>,
        errorCallback: RendererIpcErrorCallback = IpcRendererGuard.defaultErrorHandler
    ) => {
        const callback: RendererIpcCallback = (_event, success, ...args) => {
            if (success) {
                successCallback(...(args as Args));
            } else {
                errorCallback(args[0] as Error, channel);
            }
        };

        ipcRenderer.on(channel, callback);

        if (IpcRendererGuard.registeredCallbacks[channel]) {
            IpcRendererGuard.registeredCallbacks[channel].push([
                callback,
                successCallback,
            ]);
        } else {
            IpcRendererGuard.registeredCallbacks[channel] = [
                [callback, successCallback],
            ];
        }
    };

    public static removeListener: <Args extends Array<unknown> = []>(
        channel: ChannelName,
        successCallback: RendererIpcSuccessCallback<Args>
    ) => void = (channel, successCallback) => {
        const index = IpcRendererGuard.registeredCallbacks[channel].findIndex(
            (callbacks) => callbacks[1] === successCallback
        );

        const callbacks = IpcRendererGuard.registeredCallbacks[channel].splice(
            index,
            1
        )[0];

        ipcRenderer.removeListener(channel, callbacks[0]);
    };

    public static send: <Args extends Array<unknown> = []>(
        channel: ChannelName,
        ...args: Args
    ) => void = (channel, ...args) => {
        ipcRenderer.send(channel, ...args);
    };

    private static defaultErrorHandler: RendererIpcErrorCallback = (
        error,
        channel
    ) => {
        console.error(`Error on IPC channel ${channel}: ${error.message}`);
    };
}

export default IpcRendererGuard;
