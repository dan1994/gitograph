import * as React from "react";

import { useRepositoryContext } from "renderer/app/store/Repository";
import RepoTable from "./RepoTable";

const Main: React.FC = () => {
    const { inRepository, isLoading } = useRepositoryContext();

    return inRepository && !isLoading && <RepoTable />;
};

export default Main;
