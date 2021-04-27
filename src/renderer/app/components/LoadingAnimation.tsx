import * as React from "react";
import { makeStyles, useTheme } from "@material-ui/core";

import { CommitIcon } from "renderer/app/components/icons";

const useStyles = makeStyles({
    "@global": {
        "@keyframes rotate": {
            "0%": {
                transform: "rotateZ(0deg)",
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
});

const LoadingAnimation: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <CommitIcon
            className={classes.icon}
            color={theme.vscode.background.hover}
            size={200}
        />
    );
};

export default LoadingAnimation;
