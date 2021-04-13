import * as React from "react";
import { useState } from "react";
import {
    ClickAwayListener,
    ListItemIcon,
    Menu,
    MenuItem,
    makeStyles,
} from "@material-ui/core";

import Button from "renderer/app/Button";
import { ITheme } from "renderer/app/Theme";

const useStyles = makeStyles((theme: ITheme) => ({
    menu: {},
    submenu: {
        borderBottom: theme.vscode.border,
        "&:last-child": {
            borderBottom: 0,
        },
    },
    item: {
        paddingBottom: "0.5em",
        "&:hover": {
            backgroundColor: theme.vscode.background.menuHover,
        },
        "&:first-child": {
            marginTop: "0.25em",
        },
        "&:last-child": {
            marginBottom: "0.25em",
        },
    },
}));

interface IMenuItem {
    name: string;
    icon?: React.ReactNode;
    callback: () => void;
}

type ISubmenu = IMenuItem[];

interface MenuButtonProps {
    title: string;
    submenus: ISubmenu[];
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, submenus }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState<
        Element | ((element: Element) => Element)
    >(null);

    const openMenu: React.MouseEventHandler = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu: (callback?: () => void) => React.MouseEventHandler = (
        callback
    ) => () => {
        if (callback) {
            callback();
        }
        setAnchorEl(null);
    };

    return (
        <ClickAwayListener
            onClickAway={() => {
                closeMenu();
            }}
        >
            <>
                <Button onClick={openMenu}>{title}</Button>
                <Menu
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={closeMenu()}
                    className={classes.menu}
                >
                    {submenus.map((submenu, index) => (
                        <div key={index} className={classes.submenu}>
                            {submenu.map(({ name, icon, callback }) => (
                                <MenuItem
                                    key={name}
                                    onClick={closeMenu(callback)}
                                    className={classes.item}
                                >
                                    {icon && (
                                        <ListItemIcon>{icon}</ListItemIcon>
                                    )}
                                    {name}
                                </MenuItem>
                            ))}
                        </div>
                    ))}
                </Menu>
            </>
        </ClickAwayListener>
    );
};

export default MenuButton;
