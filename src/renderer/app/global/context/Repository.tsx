import * as React from "react";
import { createContext, useContext } from "react";

import { IRepository } from "renderer/app/global/context/types";
import useRepository from "renderer/app/global/context/useRepository";

const RepositoryContext = createContext(null);

const RepositoryContextProvider: React.FC<{
    children?: React.ReactNode;
}> = ({ children }) => {
    return (
        <RepositoryContext.Provider value={useRepository()}>
            {children}
        </RepositoryContext.Provider>
    );
};

const useRepositoryContext: () => IRepository = () =>
    useContext<IRepository>(RepositoryContext);

export { RepositoryContextProvider, useRepositoryContext };
