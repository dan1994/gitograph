import { useState, useEffect } from "react";

import {
    IRepository,
    IRepositoryState,
} from "renderer/app/global/context/types";
import useDirectory from "renderer/app/global/context/useDirectory";
import { getRootDirectory, getCommits } from "renderer/app/utils/git";
import Commits from "renderer/app/global/context/Commits";

const useRepository: () => IRepository = () => {
    const [directory, selectDirectory] = useDirectory();

    const [repository, setRepository] = useState<IRepositoryState>({
        rootDirectory: null,
        commits: new Commits([]),
        isLoading: false,
    });

    const updateRepository: () => void = async () => {
        const rootDirectory = await getRootDirectory(directory);
        if (rootDirectory === null) {
            return;
        }

        setRepository({ ...repository, isLoading: true });

        const rawCommits = await getCommits(rootDirectory);
        const commits = new Commits(rawCommits);

        setRepository({
            rootDirectory,
            commits,
            isLoading: false,
        });
    };

    useEffect(() => {
        updateRepository();
    }, [directory]);

    const inRepository = repository.rootDirectory !== null;

    return {
        ...repository,
        selectDirectory,
        inRepository,
    };
};

export default useRepository;
