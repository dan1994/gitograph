import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { Button } from "renderer/app/components";
import RecentlyViewedRepositories from "./RecentlyViewedRepositories";
import { ITheme, useRepositoryContext } from "renderer/app/global";

const useStyles = makeStyles((theme: ITheme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    title: {
        fontWeight: "bold",
        fontSize: "6em",
        textAlign: "center",
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
    },
}));

const LandingPage: React.FC = () => {
    const classes = useStyles();
    const { selectDirectory } = useRepositoryContext();

    return (
        <div className={classes.root}>
            <div className={classes.title}>Git O' Graph</div>
            <div className={classes.subtitle}>Open a recent repository</div>
            <RecentlyViewedRepositories />
            <div className={classes.subtitle}>Or...</div>
            <Button className={classes.button} onClick={selectDirectory}>
                Select a different repository
            </Button>
        </div>
    );
};

export default LandingPage;
