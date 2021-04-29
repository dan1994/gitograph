import * as React from "react";
import { GetDerivedStateFromError } from "react";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";
import { Button } from "renderer/app/components";
import { IpcRendererWrapper } from "renderer/app/utils/ipc";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: "3em",
            gap: "1em",
        },
        title: {
            fontWeight: "bold",
            fontSize: "4em",
            textAlign: "center",
        },
        button: {
            fontSize: "2em",
            backgroundColor: theme.vscode.background.secondary,
            width: "8em",
        },
        error: {
            fontSize: "1.25em",
            maxWidth: "100ch",

            "& div": {
                fontWeight: "bold",
                textTransform: "uppercase",
            },

            "& code": {
                display: "block",
                marginBottom: "1em",
            },
        },
    });

interface ErrorBoundaryProps extends WithStyles<typeof styles> {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: {
        message: string;
        stack?: string;
    };
    info: {
        componentStack: string;
    };
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: {
                message: "",
                stack: "",
            },
            info: { componentStack: "" },
        };
    }

    static getDerivedStateFromError: GetDerivedStateFromError<
        ErrorBoundaryProps,
        ErrorBoundaryState
    > = () => {
        return { hasError: true };
    };

    componentDidCatch: (error: Error, info: React.ErrorInfo) => void = (
        error,
        info
    ) => {
        this.setState({ error, info });
    };

    formatStack: (stack: string) => React.ReactNode = (stack) => {
        return stack
            .trim()
            .split("\n")
            .map((line) => (
                <>
                    {line}
                    <br />
                </>
            ));
    };

    render: () => React.ReactNode = () => {
        const classes = this.props.classes;

        const { hasError, error, info } = this.state;

        const stack = error.stack.substring(
            error.stack.indexOf(error.message) + error.message.length
        );

        if (hasError) {
            return (
                <div className={classes.root}>
                    <div className={classes.title}>
                        Oops... Seems like we have a problem 😅
                    </div>
                    <div>
                        <Button
                            className={classes.button}
                            onClick={() =>
                                IpcRendererWrapper.send("relaunchApp")
                            }
                        >
                            Relaunch
                        </Button>
                    </div>
                    <div className={classes.error}>
                        <div>Error</div>
                        <code>{error.message}</code>
                        <div>Stack</div>
                        <code>{this.formatStack(stack)}</code>
                        <div>Component Stack</div>
                        <code>{this.formatStack(info.componentStack)}</code>
                    </div>
                </div>
            );
        }

        return this.props.children;
    };
}

export default withStyles(styles)(ErrorBoundary);
