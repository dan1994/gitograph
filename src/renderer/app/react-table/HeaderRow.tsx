import React from "react";
import { makeStyles } from "@material-ui/core";

import { TableHeaderGroup } from "renderer/app/react-table/types";
import HeaderCell from "renderer/app/react-table/HeaderCell";
import { OnDragFunc } from "./useResizeable";

const useStyles = makeStyles({
    headerRow: {},
});

interface HeaderRowProps {
    headerGroup: TableHeaderGroup;
    widths: string[];
    onDrag: (index: number) => OnDragFunc;
}

const HeaderRow: React.FC<HeaderRowProps> = ({
    headerGroup,
    widths,
    onDrag,
    ...rest
}) => {
    const { headerRow } = useStyles();

    return (
        <div
            {...headerGroup.getHeaderGroupProps()}
            className={headerRow}
            {...rest}
        >
            {headerGroup.headers.map((column, index) => (
                <HeaderCell
                    key={column.id}
                    column={column}
                    width={widths[index]}
                    isResizeable={index !== headerGroup.headers.length - 1}
                    onDrag={onDrag(index)}
                />
            ))}
        </div>
    );
};

export default HeaderRow;
