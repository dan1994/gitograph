import * as React from "react";
import { makeStyles } from "@material-ui/core";

import { ITheme, useRepositoryContext } from "renderer/app/global";
import { Button } from "renderer/app/components";
import RecentRepositories from "renderer/app/pages/landingPage/RecentRepositories";

const useStyles = makeStyles((theme: ITheme) => ({
    root: {
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns: "3fr 2fr",
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

        "&:nth-child(2)": {
            borderRight: `2px solid ${theme.vscode.color.primary}`,
        },
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
        width: "80%",
    },
}));

const LandingPage: React.FC = () => {
    const classes = useStyles();
    const { selectDirectory } = useRepositoryContext();

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={classes.root}>
                <div className={classes.title}>Git O' Graph</div>
                <div className={classes.section}>
                    <div className={classes.subtitle}>
                        Open a recent repository
                    </div>
                    <RecentRepositories />
                </div>
                <div className={classes.section}>
                    <div className={classes.subtitle}>
                        Open another repository
                    </div>
                    <Button
                        className={classes.button}
                        onClick={() => {
                            selectDirectory();
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
