import * as React from "react";
import {
    makeStyles,
    Button,
    CircularProgress,
    Typography,
} from "@material-ui/core";

import { useRepositoryContext } from "renderer/app/store/Repository";
import RepoTable from "./RepoTable";

const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        "& > *": {
            marginBottom: 15,
        },
        marginBottom: 20,
    },
    button: {
        width: 300,
    },
});

const Main: React.FC = () => {
    const classes = useStyles();

    const {
        selectDirectory,
        rootDirectory,
        inRepository,
        isLoading,
    } = useRepositoryContext();

    return (
        <>
            <div className={classes.header}>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                        selectDirectory();
                    }}
                >
                    Select Repository
                </Button>
                <Typography variant="h5">
                    {inRepository
                        ? `Repository: ${rootDirectory}`
                        : "No Repository Selected"}
                </Typography>
                {isLoading && <CircularProgress />}
            </div>
            {inRepository && !isLoading && <RepoTable />}
        </>
    );
};

export default Main;
