import * as React from "react";
import { makeStyles } from "@material-ui/core";

import { useRepositoryContext } from "renderer/app/global";
import RepoTable from "renderer/app/pages/repositoryPage/RepoTable";
import { LoadingAnimation } from "renderer/app/components";

const useStyles = makeStyles({
    loaderContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
});

const RepositoryPage: React.FC = () => {
    const classes = useStyles();

    const { isLoading } = useRepositoryContext();

    if (isLoading) {
        return (
            <div className={classes.loaderContainer}>
                <LoadingAnimation />
            </div>
        );
    }

    return <RepoTable />;
};

export default RepositoryPage;
