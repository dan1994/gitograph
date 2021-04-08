import {
    CellPropGetter,
    HeaderGroupPropGetter,
    HeaderPropGetter,
    Hooks,
    RowPropGetter,
    TableCellProps,
    TableHeaderGroupProps,
    TableHeaderProps,
    TablePropGetter,
    TableRowProps,
} from "react-table";
import { TableRecord } from "./types";

const maxWidth: TablePropGetter<TableRecord> = (props) => [
    props,
    {
        style: {
            width: "100%",
            boxSizing: "border-box",
        },
    },
];

const rowStyles = { style: { display: "flex" } };

const headerFlexView: HeaderGroupPropGetter<TableRecord> = (props) => [
    props,
    rowStyles as Partial<TableHeaderGroupProps>,
];

const rowFlexView: RowPropGetter<TableRecord> = (props) => [
    props,
    rowStyles as Partial<TableRowProps>,
];

const cellStyle = (widthPrecentage: number) => ({
    style: {
        width: `${widthPrecentage}%`,
        boxSizing: "border-box",
    },
});

const headerDistributeWidth: HeaderPropGetter<TableRecord> = (
    props,
    { instance, column }
) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const widthPrecentage: number =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        (column as any).widthPrecentage || 100 / instance.columns.length;
    return [props, cellStyle(widthPrecentage) as Partial<TableHeaderProps>];
};

const rowDistributeWidth: CellPropGetter<TableRecord> = (
    props,
    { instance, cell }
) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const widthPrecentage: number =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        (cell.column as any).widthPrecentage || 100 / instance.columns.length;
    return [props, cellStyle(widthPrecentage) as Partial<TableCellProps>];
};

export const useFullWidthLayout: (hooks: Hooks<TableRecord>) => void = (
    hooks
) => {
    hooks.getTableProps.push(maxWidth);
    hooks.getHeaderGroupProps.push(headerFlexView);
    hooks.getHeaderProps.push(headerDistributeWidth);
    hooks.getRowProps.push(rowFlexView);
    hooks.getCellProps.push(rowDistributeWidth);
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
(useFullWidthLayout as any).pluginName = "useFullWidthLayout";
