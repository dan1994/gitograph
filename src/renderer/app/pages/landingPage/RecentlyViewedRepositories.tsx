import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { ITheme } from "renderer/app/global";
import { RepositoryIcon } from "renderer/app/components/icons";

const useStyles = makeStyles((theme: ITheme) => ({
    recentRepos: {
        display: "grid",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
        gridTemplateRows: "1fr 1fr",
        gridTemplateColumns: "repeat(5, 1fr)",
        rowGap: "2em",
        width: "50%",
    },
    recentRepo: {
        display: "flex",
        flexDirection: "column",
        padding: "0.5em",
        borderRadius: 2,
        "&:hover": {
            background: theme.vscode.background.hover,
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
}));

const RecentlyViewedRepositories: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.recentRepos}>
            {Array(10).fill(
                <div className={classes.recentRepo}>
                    <RepositoryIcon
                        className={classes.recentRepoIcon}
                        size={80}
                        color="rgb(21, 21, 21)"
                        style={{}}
                    />
                    <span className={classes.repoText}>Repo Name</span>
                </div>
            )}
        </div>
    );
};

export default RecentlyViewedRepositories;
