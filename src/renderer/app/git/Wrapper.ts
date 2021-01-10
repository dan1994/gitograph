import { findRoot, log, ReadCommitResult } from "isomorphic-git";
import * as fs from "fs";

import { ICommitContent, ICommitsContent, IUserAction } from "./types";

const getRootDirectory: (directory: string) => Promise<string> = async (
    directory
) => {
    try {
        const newRootDirectory = await findRoot({
            fs,
            filepath: directory,
        });
        return newRootDirectory;
    } catch (error) {
        return null;
    }
};

const getCommits: (directory: string) => Promise<ICommitsContent> = async (
    directory
) => {
    let commits: ReadCommitResult[] = [];

    try {
        commits = await log({ fs, dir: directory });
    } catch (error) {}

    const transformedCommits: ICommitsContent = {};
    for (const commit of commits) {
        const { oid } = commit;
        transformedCommits[oid] = transformCommit(commit);
    }

    return transformedCommits;
};

const transformCommit: (commit: ReadCommitResult) => ICommitContent = (
    commit
) => {
    const { commit: internal } = commit;
    const { tree, parent, author, committer, gpgsig, message } = internal;

    return {
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
