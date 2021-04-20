import { CommandRunnerError } from "shared/commandRunner/customError";
import { ChannelName } from "shared/ipc/channels";
import { IpcRendererGuard } from "renderer/app/utils/ipc";

type CommandCallback = (result: string) => void;

interface Commands {
    [command: string]: CommandCallback;
}

class CommandRunner {
    private static commands: Commands = {};

    public static run: (
        command: string,
        successCallback: CommandCallback
    ) => void = (command, callback) => {
        CommandRunner.commands[command] = callback;
        IpcRendererGuard.send("runCommand", command);
    };

    public static onSuccess: (command: string, result: string) => void = (
        command,
        result
    ) => {
        const callback = CommandRunner.commands[command];
        delete CommandRunner.commands[command];
        callback(result);
    };

    public static onFailure: (
        error: CommandRunnerError,
        channel: ChannelName
    ) => void = (error, channel) => {
        const command = error.command;
        delete CommandRunner.commands[command];
        IpcRendererGuard.defaultErrorHandler(error, channel);
    };
}

IpcRendererGuard.on<[string, string]>(
    "runCommand",
    CommandRunner.onSuccess,
    CommandRunner.onFailure
);

export default CommandRunner;
