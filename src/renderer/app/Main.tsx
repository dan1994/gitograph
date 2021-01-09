import * as React from "react";
import { Button, Typography } from "@material-ui/core";

import { useRepositoryContext } from "renderer/app/store/Repository";

const App: React.FC = () => {
    const {
        selectDirectory,
        rootDirectory,
        inRepository,
    } = useRepositoryContext();

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
                variant="contained"
                onClick={() => {
                    selectDirectory();
                }}
            >
                Select Repository
            </Button>
            <Typography variant="h5">
                {inRepository()
                    ? `Repository: ${rootDirectory}`
                    : "No Repository Selected"}
            </Typography>
            {/* <DirectedGraph graph={graph} /> */}
        </div>
    );
};

export default App;
