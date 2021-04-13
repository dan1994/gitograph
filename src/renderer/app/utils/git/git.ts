import { findRoot, log, ReadCommitResult } from "isomorphic-git";
import * as fs from "fs";

import { ICommitContent, IUserAction } from "./types";

const getRootDirectory: (directory: string) => Promise<string> = async (
    directory
) => {
    try {
        const newRootDirectory = await findRoot({
            fs,
            filepath: directory,
        });

        if (newRootDirectory === ".") {
            return null;
        }

        return newRootDirectory;
    } catch (error) {
        return null;
    }
};

const getCommits: (directory: string) => Promise<ICommitContent[]> = async (
    directory
) => {
    try {
        const commits = await log({ fs, dir: directory });
        return commits.map((commit) => transformCommit(commit));
    } catch (error) {
        console.error("Failed getting commit list: ", error);
        return [];
    }
};

const transformCommit: (commit: ReadCommitResult) => ICommitContent = (
    commit
) => {
    const { oid, commit: internal } = commit;
    const { tree, parent, author, committer, gpgsig, message } = internal;

    return {
        oid,
        tree,
        parents: parent,
        author: transformUserAction(author),
        committer: transformUserAction(committer),
        pgpsig: gpgsig,
        message,
    };
};

interface ILibUserAction {
    name: string;
    email: string;
    timestamp: number;
    timezoneOffset: number;
}

const transformUserAction: (action: ILibUserAction) => IUserAction = (
    action
) => {
    const { name, email, timestamp, timezoneOffset } = action;
    return {
        name,
        email,
        timestamp,
        timezone: timezoneOffset,
    };
};

export { getCommits, getRootDirectory };
