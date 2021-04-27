import * as React from "react";
import { useState, useEffect, useRef, createContext, useContext } from "react";

import { IRepository } from "renderer/app/global/context/types";
import useDirectory from "renderer/app/global/context/useDirectory";
import { Repository } from "renderer/app/utils/git";
import useRecentRepositories from "renderer/app/pages/landingPage/useRecentRepositories";
import useTriggerRerender from "renderer/app/global/context/useTriggerRerender";

const useRepository: () => IRepository = () => {
    const [directory, selectDirectory] = useDirectory();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const repositoryRef = useRef(new Repository());
    const triggerRerender = useTriggerRerender();

    const { addRecentRepository } = useRecentRepositories();

    const load: () => void = async () => {
        if (directory === null) {
            repositoryRef.current.close();
            triggerRerender();
            return;
        }

        setIsLoading(true);

        await repositoryRef.current.load(directory, "chronological");
        addRecentRepository(repositoryRef.current.rootDirectory);

        setIsLoading(false);
    };

    useEffect(load, [directory]);

    const closeRepository = () => {
        selectDirectory(null);
    };

    const inRepository = repositoryRef.current.rootDirectory !== null;

    return {
        repository: repositoryRef.current,
        selectDirectory,
        closeRepository,
        inRepository,
        isLoading,
    };
};

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
