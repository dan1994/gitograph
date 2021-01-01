export interface IPoint {
    x: number;
    y: number;
}

export interface IGridCell {
    row: number;
    column: number;
}

export interface IVertice {
    id: string;
    cell: IGridCell;
    color: string;
}

export interface IEdge {
    from: IVertice;
    to: IVertice;
}

export interface IDirectedAcyclicGraph {
    vertices: IVertice[];
    edges: IEdge[];
}
