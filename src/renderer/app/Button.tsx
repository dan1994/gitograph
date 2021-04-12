import * as React from "react";
import { makeStyles } from "@material-ui/core";

import { ITheme } from "renderer/app/Theme";

const useStyles = makeStyles((theme: ITheme) => ({
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.25em 0.5em",
        "&:hover": {
            backgroundColor: theme.vscode.background.hover,
        },
    },
}));

interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLSpanElement>;
    ref?: React.MutableRefObject<HTMLSpanElement>;
}

const Button: React.FC<ButtonProps> = ({
    children,
    className,
    onClick,
    ref,
}) => {
    const classes = useStyles();
    return (
        <span
            className={`${classes.button} ${className}`}
            onClick={onClick}
            ref={ref}
        >
            {children}
        </span>
    );
};

export default Button;
