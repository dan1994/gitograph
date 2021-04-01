import React from "react";
import { makeStyles } from "@material-ui/core";

import { TableHeaderGroup } from "renderer/app/react-table/types";
import HeaderCell from "renderer/app/react-table/HeaderCell";

const useStyles = makeStyles({
    headerRow: {},
});

interface HeaderRowProps {
    headerGroup: TableHeaderGroup;
}

const HeaderRow: React.FC<HeaderRowProps> = ({ headerGroup, ...rest }) => {
    const { headerRow } = useStyles();

    return (
        <div
            {...headerGroup.getHeaderGroupProps()}
            className={headerRow}
            {...rest}
        >
            {headerGroup.headers.map((column) => (
                <HeaderCell key={column.id} column={column} />
            ))}
        </div>
    );
};

export default HeaderRow;
