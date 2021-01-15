import * as React from "react";
import { Button, Typography } from "@material-ui/core";

import { useRepositoryContext } from "renderer/app/store/Repository";
import RepoTable from "./RepoTable";

const Main: React.FC = () => {
    const {
        selectDirectory,
        rootDirectory,
        inRepository,
    } = useRepositoryContext();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Button
                variant="contained"
                style={{ width: 300, marginBottom: 10 }}
                onClick={() => {
                    selectDirectory();
                }}
            >
                Select Repository
            </Button>
            <Typography variant="h5" style={{ marginBottom: 10 }}>
                {inRepository()
                    ? `Repository: ${rootDirectory}`
                    : "No Repository Selected"}
            </Typography>
            <RepoTable />
        </div>
    );
};

export default Main;
