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

    const branchRefs = await getBranchesPerCommit(directory);

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

        const refs = branchRefs[oid] || [];

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
            refs,
        };
    });
};

const getBranchesPerCommit: (
    directory: string
) => Promise<{ [oid: string]: IRef[] }> = async (directory) => {
    const branches = (
        await CommandRunner.run(
            `git -C "${directory}" branch --all --format="%(HEAD):%(objectname):%(refname:lstrip=1)"`
        )
    ).trim();

    const branchRefs: {
        [oid: string]: IRef[];
    } = {};

    branches.split("\n").forEach((branch) => {
        const [headMarker, oid, refName] = branch.split(":", 3);
        const isHead = headMarker === "*";
        const isLocal = refName.startsWith("heads") || isHead;
        const name =
            isHead && refName.startsWith("(")
                ? ""
                : refName.substring(refName.indexOf("/") + 1);

        if (branchRefs[oid]) {
            branchRefs[oid].push({ name, isLocal, isHead });
        } else {
            branchRefs[oid] = [{ name, isLocal, isHead }];
        }
    });

    return branchRefs;
};

export { getCommits, getRootDirectory };
