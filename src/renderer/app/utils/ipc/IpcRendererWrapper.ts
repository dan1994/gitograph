import { ipcRenderer } from "electron";
import { ChannelName } from "shared/ipc/channels";

type IpcRendererCallback<Ret> = (
    event: Electron.IpcRendererEvent,
    id: number,
    success: boolean,
    resultsOrError: Ret | Error
) => void;

class IpcRendererWrapper {
    private static counter = 0;

    public static send: <Args extends unknown[] = [], Ret = void>(
        channel: ChannelName,
        ...args: Args
    ) => Promise<Ret> = async <Args extends unknown[] = [], Ret = void>(
        channel: ChannelName,
        ...args: Args
    ) => {
        const currentId = IpcRendererWrapper.counter;
        IpcRendererWrapper.counter =
            (IpcRendererWrapper.counter + 1) % Number.MAX_SAFE_INTEGER;

        return new Promise<Ret>((resolve, reject) => {
            const callback: IpcRendererCallback<Ret> = (
                _event,
                id,
                success,
                resultsOrError
            ) => {
                if (id !== currentId) {
                    return;
                }

                ipcRenderer.removeListener(channel, callback);
                if (success) {
                    resolve(resultsOrError as Ret);
                } else {
                    reject(resultsOrError);
                }
            };

            ipcRenderer.on(channel, callback);
            ipcRenderer.send(channel, currentId, ...args);
        });
    };
}

export default IpcRendererWrapper;
