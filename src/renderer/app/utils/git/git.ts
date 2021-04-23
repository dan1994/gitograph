import { ICommitContent, IRef } from "renderer/app/utils/git/types";
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
        const [
            oid,
            tree,
            parentsString,
            authorName,
            authorEmail,
            authorTimestampString,
            committerName,
            committerEmail,
            committerTimestampString,
            message,
        ] = commitInfo.split("\x10");

        const parents =
            parentsString.length > 0 ? parentsString.split(" ") : [];

        return {
            oid,
            tree,
            parents,
            author: {
                name: authorName,
                email: authorEmail,
                timestamp: parseInt(authorTimestampString),
                timezone: 0,
            },
            committer: {
                name: committerName,
                email: committerEmail,
                timestamp: parseInt(committerTimestampString),
                timezone: 0,
            },
            message,
        };
    });
};

const getRefs: (directory: string) => Promise<IRef[]> = async (directory) => {
    const refsAsString = (
        await CommandRunner.run(
            `git -C "${directory}" for-each-ref --format="%(HEAD):%(objectname):%(refname:lstrip=1)"`
        )
    ).trim();

    return refsAsString.split("\n").map((ref) => {
        const [headMarker, oid, refName] = ref.split(":", 3);

        const isHead = headMarker === "*";
        const isLocal = refName.startsWith("heads") || isHead;
        const name =
            isHead && refName.startsWith("(")
                ? ""
                : refName.substring(refName.indexOf("/") + 1);

        return { name, oid, isLocal, isHead };
    });
};

export { getCommits, getRefs, getRootDirectory };
