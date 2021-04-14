import * as React from "react";

import { useRepositoryContext } from "renderer/app/global";
import { RepositoryPage } from "renderer/app/pages";

const Router: React.FC = () => {
    const { inRepository } = useRepositoryContext();

    if (!inRepository) {
        return <></>;
    }

    return <RepositoryPage />;
};

export default Router;
