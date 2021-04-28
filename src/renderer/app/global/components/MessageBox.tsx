import * as React from "react";
import { useRef } from "react";
import { Grow, makeStyles, Paper, Popper } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CloseIcon from "@material-ui/icons/Close";

import { useMessageBoxContext } from "renderer/app/global/components/useMessageBox";
import { Button } from "renderer/app/components";

const useStyles = makeStyles((theme) => ({
    anchor: {
        position: "absolute",
        bottom: "1rem",
        right: "1rem",
        height: 0,
        width: 0,
    },
    popper: {
        width: "35%",
    },
    paper: {
        padding: "1.25em 1em",
        backgroundColor: theme.vscode.background.secondary,
        position: "relative",
        boxShadow: "rgba(0, 0, 0, 0.36) 0px 0px 8px 2px",
    },
    titleRow: {
        marginBottom: "0.5em",
        display: "flex",
        gap: "0.5em",
    },
    title: {
        fontSize: "1.2em",
    },
    content: {},
    closeButton: {
        position: "absolute",
        top: "0.2em",
        right: "0.2em",
    },
}));

const typeToIcon = {
    info: <InfoOutlinedIcon htmlColor="#9cdcfe" />,
    error: <CancelOutlinedIcon htmlColor="#f48771" />,
};

const MessageBox: React.FC = () => {
    const classes = useStyles();
    const anchorRef = useRef<HTMLDivElement>(null);

    const { messageInfo, clearMessage } = useMessageBoxContext();

    const open = messageInfo.title.length > 0;

    return (
        <>
            <div ref={anchorRef} className={classes.anchor} />
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                transition
                placement="top-end"
                className={classes.popper}
            >
                <Grow in={open}>
                    <Paper elevation={8} className={classes.paper}>
                        <div className={classes.titleRow}>
                            {typeToIcon[messageInfo.type]}
                            <span className={classes.title}>
                                {messageInfo.title}
                            </span>
                        </div>
                        <div className={classes.content}>
                            {messageInfo.message}
                        </div>
                        <Button
                            className={classes.closeButton}
                            onClick={clearMessage}
                        >
                            <CloseIcon />
                        </Button>
                    </Paper>
                </Grow>
            </Popper>
        </>
    );
};

export default MessageBox;
