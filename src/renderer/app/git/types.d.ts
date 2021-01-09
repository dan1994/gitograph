export type ISha1 = string;

export interface IUserAction {
    name: string;
    email: string;
    timestamp: number;
    timezone: number;
}

export interface ICommitContent {
    tree: ISha1;
    parents: ISha1[];
    author: IUserAction;
    committer: IUserAction;
    pgpsig?: string;
    message: string;
}

export interface ICommitsContent {
    [oid: string]: ICommitContent;
}
