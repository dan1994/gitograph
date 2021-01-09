import * as React from "react";
import { useState, useEffect, createContext, useContext } from "react";

import { objMap } from "renderer/app/utils";
import { ICommits, ICommit, IRepository } from "renderer/app/store/types";
import { ICommitContent, ICommitsContent } from "renderer/app/git/types";
import { getRootDirectory, getCommits } from "renderer/app/git/Wrapper";
import useDirectory from "renderer/app/store/Directory";
import PlacementStrategy from "renderer/app/algorithm/PlacementStrategy";

const useRepository = () => {
    const [directory, selectDirectory] = useDirectory();

    const [repository, setRepository] = useState<IRepository>({
        rootDirectory: null,
        commits: {},
    });

    const updateRepository: () => void = async () => {
        const rootDirectory: string = await getRootDirectory(directory);

        const rawCommits: ICommitsContent = await getCommits(rootDirectory);
        const commits = toICommits(rawCommits);
        const placementStrategy = new PlacementStrategy(commits);
        placementStrategy.apply();

        setRepository({ rootDirectory, commits });
    };

    useEffect(() => {
        updateRepository();
    }, [directory]);

    const inRepository: () => boolean = () => {
        return repository.rootDirectory !== null;
    };

    return {
        ...repository,
        selectDirectory,
        inRepository,
    };
};

const toICommits: (commits: ICommitsContent) => ICommits = (commits) => {
    const transformedCommits: ICommits = objMap(commits, (_, commit) =>
        toICommit(commit)
    );

    populateChildren(transformedCommits);

    return transformedCommits;
};

const toICommit: (commit: ICommitContent) => ICommit = (commit) => {
    return {
        ...commit,
        children: [],
        cell: {
            row: -1,
            column: -1,
        },
        color: "",
    };
};

const populateChildren: (commits: ICommits) => void = (commits) => {
    for (const [oid, commit] of Object.entries(commits)) {
        const parents = commit.parents.map((parent) => commits[parent]);
        parents.map((parent) => {
            parent.children.push(oid);
        });
    }
};

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

const useRepositoryContext = () => useContext(RepositoryContext);

export { RepositoryContextProvider, useRepositoryContext };
