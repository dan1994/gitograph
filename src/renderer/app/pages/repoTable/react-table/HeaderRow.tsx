import React from "react";
import { makeStyles } from "@material-ui/core";

import { TableHeaderGroup } from "renderer/app/pages/repoTable/react-table/types";
import HeaderCell from "renderer/app/pages/repoTable/react-table/HeaderCell";

const useStyles = makeStyles({
    headerRow: {},
});

interface HeaderRowProps {
    headerGroup: TableHeaderGroup;
}

const HeaderRow: React.FC<HeaderRowProps> = ({ headerGroup }) => {
    const { headerRow } = useStyles();

    return (
        <div {...headerGroup.getHeaderGroupProps()} className={headerRow}>
            {headerGroup.headers.map((column, index) => (
                <HeaderCell
                    key={column.id}
                    column={column}
                    columnIndex={index}
                />
            ))}
        </div>
    );
};

export default HeaderRow;
