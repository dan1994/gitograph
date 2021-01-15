import { useState, useEffect } from "react";

import {
    ICommits,
    ICommit,
    IRepository,
    IRepositoryState,
} from "renderer/app/store/hooks/types";
import { ICommitContent, ICommitsContent } from "renderer/app/git/types";
import { getRootDirectory, getCommits } from "renderer/app/git/Wrapper";
import useDirectory from "renderer/app/store/hooks/Directory";
import PlacementStrategy from "renderer/app/algorithm/PlacementStrategy";

const useRepository: () => IRepository = () => {
    const [directory, selectDirectory] = useDirectory();

    const [repository, setRepository] = useState<IRepositoryState>({
        rootDirectory: null,
        commits: {},
    });

    const updateRepository: () => void = async () => {
        const rootDirectory: string = await getRootDirectory(directory);

        if (rootDirectory === null) {
            return;
        }

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
    const transformedCommits: ICommits = Object.entries(commits).reduce(
        (result, [oid, commit]) => ({
            ...result,
            [oid]: toICommit(commit),
        }),
        {}
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

export default useRepository;
