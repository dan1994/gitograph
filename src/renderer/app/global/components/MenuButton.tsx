import * as React from "react";
import { useState } from "react";
import {
    ClickAwayListener,
    ListItemIcon,
    Menu,
    MenuItem,
    makeStyles,
} from "@material-ui/core";

import { Button } from "renderer/app/components";

const useStyles = makeStyles((theme) => ({
    menu: {},
    submenu: {
        borderBottom: theme.vscode.border,
        "&:last-child": {
            borderBottom: 0,
        },
        outline: "none",
    },
    item: {
        paddingBottom: "0.5em",
        "&:first-child": {
            marginTop: "0.25em",
        },
        "&:last-child": {
            marginBottom: "0.25em",
        },
    },
    enabled: {
        "&:hover": {
            backgroundColor: theme.vscode.background.menuHover,
        },
    },
    disabled: {
        cursor: "initial",
        color: "#565656",
    },
}));

interface IMenuItem {
    name: string;
    icon?: React.ReactNode;
    disabled?: boolean;
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
                <Button onClick={openMenu} style={{ cursor: "initial" }}>
                    {title}
                </Button>
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
                            {submenu.map(
                                ({ name, icon, disabled, callback }) => (
                                    <MenuItem
                                        key={name}
                                        disabled={disabled}
                                        onClick={closeMenu(callback)}
                                        className={`${classes.item} ${
                                            disabled
                                                ? classes.disabled
                                                : classes.enabled
                                        }`}
                                    >
                                        {icon && (
                                            <ListItemIcon>{icon}</ListItemIcon>
                                        )}
                                        {name}
                                    </MenuItem>
                                )
                            )}
                        </div>
                    ))}
                </Menu>
            </>
        </ClickAwayListener>
    );
};

export default MenuButton;
