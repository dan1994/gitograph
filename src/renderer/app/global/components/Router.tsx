import * as React from "react";

import { useRepositoryContext } from "renderer/app/global/context/Repository";
import RepoTable from "renderer/app/pages/repoTable/RepoTable";

const Router: React.FC = () => {
    const { inRepository, isLoading } = useRepositoryContext();

    return inRepository && !isLoading && <RepoTable />;
};

export default Router;
