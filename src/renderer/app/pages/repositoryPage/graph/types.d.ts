import { ICommit } from "renderer/app/utils/git/types";

export interface IPoint {
    x: number;
    y: number;
}

export interface IEdge {
    from: ICommit;
    to: ICommit;
}
