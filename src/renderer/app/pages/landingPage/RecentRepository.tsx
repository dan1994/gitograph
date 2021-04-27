import * as React from "react";
import { makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { useRepositoryContext } from "renderer/app/global";
import { Button } from "renderer/app/components";
import { RepositoryIcon } from "renderer/app/components/icons";

const useStyles = makeStyles((theme) => ({
    recentRepo: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "0.5em",
        borderRadius: 10,
        height: "10em",
        width: "10em",

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
        position: "absolute",
        bottom: "0.5em",
        textAlign: "center",
        fontSize: "1.1em",
    },
    removeIcon: {
        position: "absolute",
        top: "0.3rem",
        right: "0.3rem",
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

    const { selectDirectory } = useRepositoryContext();

    const openRepository: React.MouseEventHandler = () => {
        selectDirectory(repositoryPath);
    };

    const removeRepository: React.MouseEventHandler = (event) => {
        event.stopPropagation();
        removeCallback();
    };

    return (
        <Button className={classes.recentRepo} onClick={openRepository}>
            <RepositoryIcon className={classes.recentRepoIcon} size={"5.5em"} />
            <span className={classes.repoText}>
                {repositoryPath.split(/[\\/]/).pop()}
            </span>
            <CloseIcon
                className={`${classes.removeIcon} removeIcon`}
                onClick={removeRepository}
            />
        </Button>
    );
};

export default RecentRepository;
