import { IDirectedGraph } from "./graph/types";

const dummyRepository: IDirectedGraph = [
    {
        id: "5",
        cell: {
            row: 0,
            column: 0,
        },
        color: "green",
        children: [],
    },
    {
        id: "3",
        cell: {
            row: 1,
            column: 0,
        },
        color: "green",
        children: [],
    },
    {
        id: "2",
        cell: {
            row: 2,
            column: 0,
        },
        color: "green",
        children: [],
    },
    {
        id: "1",
        cell: {
            row: 3,
            column: 1,
        },
        color: "blue",
        children: [],
    },
    {
        id: "4",
        cell: {
            row: 4,
            column: 2,
        },
        color: "red",
        children: [],
    },
    {
        id: "0",
        cell: {
            row: 5,
            column: 0,
        },
        color: "green",
        children: [],
    },
];

dummyRepository[0].children = [dummyRepository[1], dummyRepository[4]];
dummyRepository[1].children = [dummyRepository[2]];
dummyRepository[2].children = [dummyRepository[5]];
dummyRepository[3].children = [dummyRepository[5]];
dummyRepository[4].children = [dummyRepository[5]];

export default dummyRepository;
