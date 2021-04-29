import * as React from "react";
import { makeStyles } from "@material-ui/core";

import { useRepositoryContext } from "renderer/app/global";
import { Button } from "renderer/app/components";
import RecentRepositories from "renderer/app/pages/landingPage/RecentRepositories";
import useRecentRepositories from "./useRecentRepositories";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        paddingTop: "3em",
    },
    layout: {
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns: (hasRecentRepositories) =>
            hasRecentRepositories ? "3fr 2fr" : "1fr",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        height: "100%",
        width: "70%",
        columnGap: "1em",
    },
    section: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
    },
    sectionWithSeparator: {
        borderRight: `2px solid ${theme.vscode.color.primary}`,
    },
    title: {
        gridColumn: "1 / span 2",
        fontWeight: "bold",
        fontSize: "6em",
        textAlign: "center",
        marginBottom: "0.5em",
    },
    subtitle: {
        fontStyle: "italic",
        fontSize: "2em",
        textAlign: "center",
        margin: "1.5em 0",
    },
    button: {
        fontSize: "2em",
        boxShadow: `0.1rem 0.1rem ${theme.vscode.background.hover}`,
        backgroundColor: theme.vscode.background.secondary,
        width: "8em",
    },
}));

const LandingPage: React.FC = () => {
    const { recentRepositories } = useRecentRepositories();
    const classes = useStyles(recentRepositories.length > 0);
    const { selectDirectory } = useRepositoryContext();

    return (
        <div className={classes.root}>
            <div className={classes.layout}>
                <div className={classes.title}>Git O' Graph</div>
                {recentRepositories.length > 0 && (
                    <div
                        className={`${classes.section} ${classes.sectionWithSeparator}`}
                    >
                        <div className={classes.subtitle}>
                            Open a recent repository
                        </div>
                        <RecentRepositories />
                    </div>
                )}
                <div className={classes.section}>
                    <div className={classes.subtitle}>Open a repository</div>
                    <Button
                        className={classes.button}
                        onClick={() => {
                            void selectDirectory();
                        }}
                    >
                        Open
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
