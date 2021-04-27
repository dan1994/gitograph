import * as React from "react";
import { makeStyles } from "@material-ui/core";

import Toolbar from "renderer/app/global/components/Toolbar";

const useStyles = makeStyles((theme) => ({
    root: {
        overflowY: "hidden",
    },
    content: {
        position: "relative",
        height: "96vh",
        boxSizing: "border-box",
        overflowY: "scroll",
        marginTop: "2rem",
        padding: "1rem 1rem 0 1rem",
        "&::-webkit-scrollbar": {
            width: "10px",
            background: theme.vscode.background.primary,
        },
        "&::-webkit-scrollbar-track": {
            boxShadow: `inset 0 0 10px ${theme.vscode.background.primary}`,
        },
        "&::-webkit-scrollbar-thumb": {
            background: theme.vscode.scrollbar.background.primary,
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: theme.vscode.scrollbar.background.secondary,
        },
    },
}));

interface WindowFrameProps {
    children?: React.ReactNode;
}

const WindowFrame: React.FC<WindowFrameProps> = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Toolbar />
            <div className={classes.content}>{children}</div>
        </div>
    );
};

export default WindowFrame;
