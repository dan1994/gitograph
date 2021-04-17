import * as React from "react";
import { makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { ITheme } from "renderer/app/global";
import { Button } from "renderer/app/components";
import { RepositoryIcon } from "renderer/app/components/icons";

const useStyles = makeStyles((theme: ITheme) => ({
    recentRepo: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "0.5em",
        borderRadius: 10,

        "& .removeIcon": {
            visibility: "hidden",
        },

        "&:hover .removeIcon": {
            visibility: "visible",
        },
    },
    recentRepoIcon: {
        background: theme.vscode.background.hover,
        borderRadius: "50%",
        marginBottom: "0.5em",
    },
    repoText: {
        textAlign: "center",
        fontSize: "1.1em",
    },
    removeIcon: {
        position: "absolute",
        top: "-0.1rem",
        right: "-0.1rem",
    },
}));

interface RecentRepositoryProps {
    repositoryPath: string;
    removeCallback: () => void;
}

const RecentRepository: React.FC<RecentRepositoryProps> = ({
    repositoryPath,
    removeCallback,
}) => {
    const classes = useStyles();

    return (
        <Button className={classes.recentRepo}>
            <RepositoryIcon className={classes.recentRepoIcon} size={80} />
            <span className={classes.repoText}>{repositoryPath}</span>
            <CloseIcon
                className={`${classes.removeIcon} removeIcon`}
                onClick={removeCallback}
            />
        </Button>
    );
};

export default RecentRepository;
