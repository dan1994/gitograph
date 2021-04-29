import * as React from "react";
import { useState, useEffect, useRef, createContext, useContext } from "react";

import { IRepository } from "renderer/app/global/context/types";
import useDirectory from "renderer/app/global/context/useDirectory";
import { Repository } from "renderer/app/utils/git";
import useRecentRepositories from "renderer/app/pages/landingPage/useRecentRepositories";
import useTriggerRerender from "renderer/app/global/context/useTriggerRerender";
import { useMessageBoxContext } from "renderer/app/global/components/useMessageBox";
import { IpcRendererWrapper } from "renderer/app/utils/ipc";

const useRepository: () => IRepository = () => {
    const [directory, selectDirectory] = useDirectory();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const repositoryRef = useRef(new Repository());
    const repository = repositoryRef.current;
    const triggerRerender = useTriggerRerender();
    const { displayError } = useMessageBoxContext();

    const { addRecentRepository } = useRecentRepositories();

    const load = async () => {
        if (directory === null) {
            repositoryRef.current.close();
            triggerRerender();
            return;
        }

        setIsLoading(true);

        try {
            await repository.load(directory, "chronological");
        } catch (error) {
            void selectDirectory(repository.rootDirectory);
            displayError("Failed to load repository", (error as Error).message);
        }

        setIsLoading(false);
    };

    useEffect(() => void load(), [directory]);

    useEffect(() => {
        if (repository.rootDirectory !== null) {
            addRecentRepository(repository.rootDirectory);
        }
    }, [repository.rootDirectory]);

    const refreshRepository = async () => {
        if (directory === null) {
            return;
        }

        setIsLoading(true);

        try {
            await repository.refresh("chronological");
        } catch (error) {
            displayError(
                "Failed to refresh repository",
                (error as Error).message
            );
        }

        setIsLoading(false);
    };

    useEffect(() => {
        if (repository.rootDirectory === null) {
            return;
        }

        const handler = setInterval(() => {
            void (async () => {
                const repositoryChanged = await IpcRendererWrapper.send<
                    [string],
                    boolean
                >("watchRepository", repository.rootDirectory);

                if (repositoryChanged) {
                    void refreshRepository();
                }
            })();
        }, 5000);

        return () => clearInterval(handler);
    }, [repository.rootDirectory]);

    const closeRepository = () => selectDirectory(null);

    const inRepository = repository.rootDirectory !== null;

    return {
        repository,
        selectDirectory,
        refreshRepository,
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
