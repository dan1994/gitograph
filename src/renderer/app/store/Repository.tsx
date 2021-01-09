import { useState, useEffect, createContext, useContext } from "react";

import { objMap } from "renderer/app/utils";
import { ICommits, ICommit } from "renderer/app/store/types";
import { ICommitContent, ICommitsContent } from "renderer/app/git/types";
import { getRootDirectory, getCommits } from "renderer/app/git/Wrapper";
import useDirectory from "renderer/app/store/Directory";
import GraphGenerator from "../algorithm/GraphGenerator";

const useRepository = () => {
    const [directory, selectDirectory] = useDirectory();

    const [rootDirectory, setRootDirectory] = useState<string>(null);
    const [commits, setCommits] = useState<ICommits>({});

    const updateCommits: () => void = async () => {
        const rawCommits: ICommitsContent = await getCommits(rootDirectory);
        const commits = toICommits(rawCommits);
        const graphGenerator = new GraphGenerator(commits);
        graphGenerator.generate();
        setCommits(commits);
    };

    useEffect(() => {
        (async () => {
            setRootDirectory(await getRootDirectory(directory));
        })();
    }, [directory]);

    useEffect(() => {
        updateCommits();
    }, [rootDirectory]);

    const inRepository: () => boolean = () => {
        return rootDirectory !== null;
    };

    return {
        selectDirectory,
        rootDirectory,
        inRepository,
        commits,
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
        id: "", // REMOVE
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
