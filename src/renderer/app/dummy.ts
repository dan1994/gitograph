import { IDirectedAcyclicGraph, IEdge, IVertice } from "./graph/types";

const vertices: IVertice[] = [
    {
        id: "3",
        cell: {
            row: 0,
            column: 0,
        },
        color: "green",
    },
    {
        id: "2",
        cell: {
            row: 1,
            column: 0,
        },
        color: "green",
    },
    {
        id: "1",
        cell: {
            row: 2,
            column: 1,
        },
        color: "blue",
    },
    {
        id: "4",
        cell: {
            row: 3,
            column: 2,
        },
        color: "red",
    },
    {
        id: "0",
        cell: {
            row: 4,
            column: 0,
        },
        color: "green",
    },
];

const edges: IEdge[] = [
    {
        from: vertices[0],
        to: vertices[1],
    },
    {
        from: vertices[1],
        to: vertices[4],
    },
    {
        from: vertices[2],
        to: vertices[4],
    },
    {
        from: vertices[3],
        to: vertices[4],
    },
];

const dummyRepository: IDirectedAcyclicGraph = {
    vertices: Object.values(vertices),
    edges,
};

export default dummyRepository;
