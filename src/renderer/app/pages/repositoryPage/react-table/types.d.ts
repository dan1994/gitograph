import {
    Row,
    Cell,
    HeaderGroup,
    TablePropGetter,
    TableProps,
} from "react-table";

interface TableRecord {
    graph: string;
    message: JSX.Element;
    committer: string;
    time: string;
    hash: string;
}

type TableHeaderGroup = HeaderGroup<TableRecord>;
type TableCell = Cell<TableRecord, any>;
type TableRow = Row<TableRecord>;

type GetPropsFunction<Getter, Props> = (getter?: Getter<TableRow>) => Props;
type GetTablePropsFunction = GetPropsFunction<TablePropGetter, TableProps>;
type GetTableBodyPropsFunction = GetPropsFunction<
    TableBodyPropGetter,
    TableBodyProps
>;
