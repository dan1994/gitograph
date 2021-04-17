import * as React from "react";
import { makeStyles } from "@material-ui/core";

import useRecentRepositories from "renderer/app/pages/landingPage/useRecentRepositories";
import RecentRepository from "renderer/app/pages/landingPage/RecentRepository";

const useStyles = makeStyles({
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
});

const RecentRepositories: React.FC = () => {
    const classes = useStyles();

    const {
        recentRepositories,
        removeRecentRepository,
    } = useRecentRepositories();

    return (
        <div className={classes.recentRepos}>
            {recentRepositories.map((repositoryPath) => (
                <RecentRepository
                    key={repositoryPath}
                    repositoryPath={repositoryPath}
                    removeCallback={() => {
                        removeRecentRepository(repositoryPath);
                    }}
                />
            ))}
        </div>
    );
};

export default RecentRepositories;
