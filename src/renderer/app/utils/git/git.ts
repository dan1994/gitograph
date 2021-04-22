import { ICommitContent } from "renderer/app/utils/git/types";
import CommandRunner from "renderer/app/utils/commandRunner/CommandRunner";

const getRootDirectory: (directory: string) => Promise<string> = async (
    directory
) => {
    try {
        return (
            await CommandRunner.run(
                `git -C "${directory}" rev-parse --show-toplevel`
            )
        ).trimEnd();
    } catch (error) {
        return null;
    }
};

const getCommits: (directory: string) => Promise<ICommitContent[]> = async (
    directory
) => {
    const logString = await CommandRunner.run(
        `git -C "${directory}" log --all --format=format:${[
            "%H",
            "%T",
            "%P",
            "%an",
            "%ae",
            "%at",
            "%cn",
            "%ce",
            "%ct",
            "%s",
        ].join("%x10")}`
    );

    return logString.split("\n").map((commitInfo) => {
        const fields = commitInfo.split("\x10");
        const parents = fields[2].length > 0 ? fields[2].split(" ") : [];

        return {
            oid: fields[0],
            tree: fields[1],
            parents,
            author: {
                name: fields[3],
                email: fields[4],
                timestamp: parseInt(fields[5]),
                timezone: 0,
            },
            committer: {
                name: fields[6],
                email: fields[7],
                timestamp: parseInt(fields[8]),
                timezone: 0,
            },
            message: fields[9],
        };
    });
};

export { getCommits, getRootDirectory };
