import { ipcRenderer } from "electron";
import { ChannelName } from "shared/ipc/channels";

type RendererIpcCallback = (
    event: Electron.IpcRendererEvent,
    success: boolean,
    resultsOrError: unknown
) => void;

export type RendererIpcSuccessCallback<Args extends unknown[] = []> = (
    ...results: Args
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

    public static on: <Args extends unknown[] = []>(
        channel: ChannelName,
        successCallback: RendererIpcSuccessCallback<Args>,
        errorCallback?: RendererIpcErrorCallback
    ) => void = <Args extends unknown[] = []>(
        channel: ChannelName,
        successCallback: RendererIpcSuccessCallback<Args>,
        errorCallback: RendererIpcErrorCallback = IpcRendererGuard.defaultErrorHandler
    ) => {
        const callback: RendererIpcCallback = (
            _event,
            success,
            resultsOrError
        ) => {
            if (success) {
                const resultsAsArray = Array.isArray(resultsOrError)
                    ? resultsOrError
                    : [resultsOrError];
                successCallback(...(resultsAsArray as Args));
            } else {
                errorCallback(resultsOrError as Error, channel);
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

    public static removeListener: <Args extends unknown[] = []>(
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

    public static send: <Args extends unknown[] = []>(
        channel: ChannelName,
        ...args: Args
    ) => void = (channel, ...args) => {
        ipcRenderer.send(channel, ...args);
    };

    public static defaultErrorHandler: RendererIpcErrorCallback = (
        error,
        channel
    ) => {
        console.error(`Error on IPC channel ${channel}: ${error.message}`);
    };
}

export default IpcRendererGuard;
