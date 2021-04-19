import * as React from "react";
import { makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MinimizeIcon from "@material-ui/icons/Minimize";

import { useRepositoryContext, ITheme } from "renderer/app/global";
import { Button } from "renderer/app/components";
import MenuButton from "renderer/app/global/components/MenuButton";
import { IpcRendererGuard } from "renderer/app/utils/ipc";

const useStyles = makeStyles((theme: ITheme) => ({
    toolbar: {
        "-webkit-user-select": "none",
        "-webkit-app-region": "drag",
        position: "fixed",
        display: "flex",
        alignItems: "center",
        height: "2rem",
        width: "100%",
        background: theme.vscode.background.secondary,
        zIndex: 10,
        fontSize: "1.1em",
        padding: "0 0.5em",
    },
    menuArea: {
        "-webkit-app-region": "no-drag",
        display: "flex",
    },
    title: {
        fontWeight: "bold",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        overflowX: "hidden",
        whiteSpace: "nowrap",
    },
    windowActions: {
        "-webkit-app-region": "no-drag",
        display: "flex",
        position: "absolute",
        right: 0,
    },
    closeButton: {
        "&:hover": {
            backgroundColor: "#d61425",
        },
    },
}));

const Toolbar: React.FC = () => {
    const classes = useStyles();

    const {
        inRepository,
        rootDirectory,
        selectDirectory,
    } = useRepositoryContext();

    const minimizeApp = () => {
        IpcRendererGuard.send("minimizeWindow");
    };

    const exitApp = () => {
        IpcRendererGuard.send("exitApp");
    };

    return (
        <header className={classes.toolbar}>
            <span className={classes.menuArea}>
                <MenuButton
                    title="File"
                    submenus={[
                        [
                            {
                                name: "Open Repository",
                                callback: selectDirectory,
                            },
                        ],
                        [
                            {
                                name: "Exit",
                                callback: exitApp,
                            },
                        ],
                    ]}
                />
            </span>
            <span className={classes.title}>
                Git O' Graph{inRepository && ` - ${rootDirectory}`}
            </span>
            <span className={classes.windowActions}>
                <Button
                    style={{ cursor: "initial" }}
                    children={<MinimizeIcon onClick={minimizeApp} />}
                />
                <Button
                    style={{ cursor: "initial" }}
                    className={classes.closeButton}
                    children={<CloseIcon onClick={exitApp} />}
                />
            </span>
        </header>
    );
};

export default Toolbar;
