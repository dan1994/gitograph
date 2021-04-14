import * as React from "react";
import { makeStyles } from "@material-ui/core";

import { ITheme, theme } from "renderer/app/global";
import { CommitIcon } from "renderer/app/components/icons";

const useStyles = makeStyles((theme: ITheme) => ({
    "@global": {
        "@keyframes rotate": {
            "0%": {
                transform: "rotateZ(0deg)",
            },
            "90%": {
                transform: "rotateZ(360deg)",
            },
            "100%": {
                transform: "rotateZ(360deg)",
            },
        },
    },
    icon: {
        animation: "rotate 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite",
        transformOrigin: "center center",
    },
}));

const LoadingAnimation: React.FC = () => {
    const classes = useStyles();
    const theme2 = theme as ITheme;
    return (
        <CommitIcon
            className={classes.icon}
            color={theme2.vscode.background.hover}
            size={200}
        />
    );
};

export default LoadingAnimation;
