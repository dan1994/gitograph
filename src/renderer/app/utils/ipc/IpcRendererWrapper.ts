import { ipcRenderer } from "electron";
import { ChannelName } from "shared/ipc/channels";

type IpcRendererCallback<Ret> = (
    event: Electron.IpcRendererEvent,
    success: boolean,
    resultsOrError: Ret | Error
) => void;

class IpcRendererWrapper {
    public static send: <Args extends unknown[] = [], Ret = void>(
        channel: ChannelName,
        ...args: Args
    ) => Promise<Ret> = async <Args extends unknown[] = [], Ret = void>(
        channel: ChannelName,
        ...args: Args
    ) => {
        return new Promise<Ret>((resolve, reject) => {
            const callback: IpcRendererCallback<Ret> = (
                _event,
                success,
                resultsOrError
            ) => {
                ipcRenderer.removeListener(channel, callback);
                if (success) {
                    resolve(resultsOrError as Ret);
                } else {
                    reject(resultsOrError);
                }
            };
            ipcRenderer.on(channel, callback);
            ipcRenderer.send(channel, ...args);
        });
    };
}

export default IpcRendererWrapper;
