import * as React from "react";

import { useRepositoryContext } from "renderer/app/global";
import { LandingPage, RepositoryPage } from "renderer/app/pages";

const Router: React.FC = () => {
    const { inRepository, isLoading } = useRepositoryContext();

    if (!inRepository && !isLoading) {
        return <LandingPage />;
    }

    return <RepositoryPage />;
};

export default Router;
