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
            "%D",
        ].join("%x10")}`
    );

    return logString.split("\n").map((commitInfo) => {
        const fields = commitInfo.split("\x10");
        const parents = fields[2].length > 0 ? fields[2].split(" ") : [];
        const [refs, isHead] = parseRefs(fields[10]);

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
            refs,
            isHead,
        };
    });
};

const parseRefs: (refsAsString: string) => [string[], boolean] = (
    refsAsString
) => {
    if (refsAsString.length === 0) {
        return [[], false];
    }

    let isHead = false;
    const refs = refsAsString.split(", ").map((ref) => {
        if (ref.startsWith("HEAD -> ")) {
            isHead = true;
            return ref.substring("HEAD -> ".length);
        }
        return ref;
    });
    return [refs, isHead];
};

export { getCommits, getRootDirectory };
