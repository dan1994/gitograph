export type ISha1 = string;

export interface IUserAction {
    name: string;
    email: string;
    timestamp: number;
    timezone: number;
}

export interface IRef {
    name: string;
    isLocal: boolean;
    isHead: boolean;
    oid: string;
}

export interface ICommitContent {
    oid: string;
    tree: ISha1;
    parents: ISha1[];
    author: IUserAction;
    committer: IUserAction;
    message: string;
}
