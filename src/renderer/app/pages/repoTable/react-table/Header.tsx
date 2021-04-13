import React from "react";
import { makeStyles } from "@material-ui/core";

import { TableHeaderGroup } from "renderer/app/pages/repoTable/react-table/types";
import HeaderRow from "renderer/app/pages/repoTable/react-table/HeaderRow";

const useStyles = makeStyles({
    header: {
        /* These styles are required for a scrollable body to align with the header properly */
        overflowY: "auto",
        overflowX: "hidden",
    },
});

interface HeaderProps {
    headerGroups: TableHeaderGroup[];
}

const Header: React.FC<HeaderProps> = ({ headerGroups }) => {
    const { header } = useStyles();

    return (
        <div className={header}>
            {headerGroups.map((headerGroup, index) => (
                <HeaderRow key={index} headerGroup={headerGroup} />
            ))}
        </div>
    );
};

export default Header;
