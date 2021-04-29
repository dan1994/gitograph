import { IGridCell } from "renderer/app/utils/git/types";
import { IPoint } from "renderer/app/pages/repositoryPage/graph/types";

export const VERTICE_RADIUS = 6;
export const EDGE_THICKNESS: number = VERTICE_RADIUS / 2;
export const ROW_HEIGHT: number = VERTICE_RADIUS * 7;
export const COLUMN_WIDTH: number = VERTICE_RADIUS * 5;
export const ROW_OFFSET: number = ROW_HEIGHT / 2;
export const COLUMN_OFFSET: number = 4 * VERTICE_RADIUS;

export const toPoint: (cell: IGridCell) => IPoint = ({ row, column }) => {
    return {
        x: COLUMN_OFFSET + COLUMN_WIDTH * column,
        y: ROW_OFFSET + ROW_HEIGHT * row,
    };
};
