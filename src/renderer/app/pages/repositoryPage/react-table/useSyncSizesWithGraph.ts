import { CellPropGetter, Hooks, HeaderPropGetter } from "react-table";
import { TableRecord } from "renderer/app/pages/repositoryPage/react-table/types";
import { ROW_HEIGHT } from "renderer/app/pages/repositoryPage/graph/utils";

const headerCell: HeaderPropGetter<TableRecord> = (props) => [
    props,
    {
        style: {
            height: 1.2 * ROW_HEIGHT,
        },
    },
];

const dataCell: CellPropGetter<TableRecord> = (props) => [
    props,
    {
        style: {
            height: ROW_HEIGHT,
        },
    },
];

export const useSyncSizeWithGraph: (hooks: Hooks<TableRecord>) => void = (
    hooks
) => {
    hooks.getHeaderProps.push(headerCell);
    hooks.getCellProps.push(dataCell);
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
(useSyncSizeWithGraph as any).pluginName = "useSyncSizeWithGraph";
