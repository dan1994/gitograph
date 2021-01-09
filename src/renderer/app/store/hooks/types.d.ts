import { ISha1, ICommitContent } from "renderer/app/git/types";
import { IVertice } from "renderer/app/graph/types";

export interface IComputedCommitProperties {
    children: ISha1[];
}

export type ICommit = ICommitContent & IComputedCommitProperties & IVertice;

export interface ICommits {
    [oid: string]: ICommit;
}

export interface IRepositoryState {
    rootDirectory: string;
    commits: ICommits;
}

export interface IRepository extends IRepositoryState {
    inRepository: () => boolean;
    selectDirectory: () => void;
}
