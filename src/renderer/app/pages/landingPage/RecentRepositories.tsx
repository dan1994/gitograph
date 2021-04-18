import * as React from "react";
import { makeStyles } from "@material-ui/core";

import useRecentRepositories from "renderer/app/pages/landingPage/useRecentRepositories";
import RecentRepository from "renderer/app/pages/landingPage/RecentRepository";

const useStyles = makeStyles({
    recentRepos: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
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
            {recentRepositories.slice(0, 8).map((repositoryPath) => (
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
