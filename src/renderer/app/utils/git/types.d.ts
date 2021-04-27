export type ISha1 = string;

export interface IUserAction {
    name: string;
    email: string;
    timestamp: number;
}

export interface ICommitContent {
    oid: string;
    tree: ISha1;
    parents: ISha1[];
    author: IUserAction;
    committer: IUserAction;
    message: string;
}

export interface IComputedCommitProperties {
    children: ISha1[];
    row: number;
    column: number;
    color: string;
}

export type ICommit = ICommitContent & IComputedCommitProperties;

export type ISortOrder = "topological" | "chronological";

export type IRefType = "localBranch" | "remoteBranch" | "tag" | "stash" | "detachedHead";

export interface IRef {
    name: string;
    type: IRefType;
    isHead: boolean;
    oid: string;
}
