import { ISha1, ICommitContent } from "renderer/app/utils/git/types";
import { IVertice } from "renderer/app/pages/repositoryPage/graph/types";
import Commits from "renderer/app/global/context/Commits";

export interface IComputedCommitProperties {
    children: ISha1[];
}

export type ICommit = ICommitContent & IComputedCommitProperties & IVertice;

export interface IRepositoryState {
    rootDirectory: string;
    commits: Commits;
    isLoading: boolean;
}

export interface IRepository extends IRepositoryState {
    inRepository: boolean;
    selectDirectory: () => void;
}
