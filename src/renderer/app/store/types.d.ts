import { ISha1, ICommitContent } from "../git/types";
import { INode } from "../graph/types";

export interface IComputedCommitProperties {
    children: ISha1[];
}

export type ICommit = ICommitContent & IComputedCommitProperties & INode;

export interface ICommits {
    [oid: string]: ICommit;
}

export interface IRepository {
    rootDirectory: string;
    commits: ICommits;
}
