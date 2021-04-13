import * as React from "react";

import { useRepositoryContext } from "renderer/app/global";
import { RepoTable } from "renderer/app/pages";

const Router: React.FC = () => {
    const { inRepository, isLoading } = useRepositoryContext();

    return inRepository && !isLoading && <RepoTable />;
};

export default Router;
