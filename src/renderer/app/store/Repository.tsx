import * as React from "react";
import { createContext, useContext } from "react";

import { IRepository } from "renderer/app/store/hooks/types";
import useRepository from "renderer/app/store/hooks/Repository";

const RepositoryContext = createContext(null);

const RepositoryContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    return (
        <RepositoryContext.Provider value={useRepository()}>
            {children}
        </RepositoryContext.Provider>
    );
};

const useRepositoryContext: () => IRepository = () =>
    useContext(RepositoryContext);

export { RepositoryContextProvider, useRepositoryContext };
