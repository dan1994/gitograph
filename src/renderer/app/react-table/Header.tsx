import React from "react";
import { makeStyles } from "@material-ui/core";

import { TableHeaderGroup } from "renderer/app/react-table/types";
import HeaderRow from "renderer/app/react-table/HeaderRow";
import { OnDragFunc } from "./useResizeable";

const useStyles = makeStyles({
    header: {
        /* These styles are required for a scrollable body to align with the header properly */
        overflowY: "auto",
        overflowX: "hidden",
    },
});

interface HeaderProps {
    headerGroups: TableHeaderGroup[];
    widths: string[];
    onDrag: (index: number) => OnDragFunc;
}

const Header: React.FC<HeaderProps> = ({
    headerGroups,
    widths,
    onDrag,
    ...rest
}) => {
    const { header } = useStyles();

    return (
        <div className={header} {...rest}>
            {headerGroups.map((headerGroup, index) => (
                <HeaderRow
                    key={index}
                    headerGroup={headerGroup}
                    widths={widths}
                    onDrag={onDrag}
                />
            ))}
        </div>
    );
};

export default Header;
