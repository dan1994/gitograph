import { ipcRenderer } from "electron";
import { ChannelName } from "shared/ipc/channels";

export type RendererIpcCallback = (
    event: Electron.IpcRendererEvent,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
) => void;

class IpcRendererGuard {
    public static on: (
        channel: ChannelName,
        callback: RendererIpcCallback
    ) => void = (channel, callback) => {
        ipcRenderer.on(channel, callback);
    };

    public static removeListener: (
        channel: ChannelName,
        callback: RendererIpcCallback
    ) => void = (channel, callback) => {
        ipcRenderer.removeListener(channel, callback);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static send: (channel: ChannelName, ...args: any[]) => void = (
        channel,
        ...args
    ) => {
        ipcRenderer.send(channel, ...args);
    };
}

export default IpcRendererGuard;
