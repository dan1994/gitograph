import * as React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        "-webkit-user-select": "none",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.25em 0.5em",
        "&:hover": {
            backgroundColor: theme.vscode.background.hover,
        },
    },
}));

interface ButtonProps extends React.HTMLProps<HTMLSpanElement> {
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
    ...rest
}) => {
    const classes = useStyles();
    return (
        <span
            {...rest}
            className={`${classes.button} ${className}`}
            onClick={onClick}
            ref={ref}
        >
            {children}
        </span>
    );
};

export default Button;
