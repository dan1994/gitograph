import { useState, useEffect } from "react";
import { findRoot, log as gitLog } from "isomorphic-git";
import * as fs from "fs";

import useDirectory from "renderer/app/git/Directory";
import Commit from "renderer/app/algorithm/Commit";

const useRepository = () => {
    const [directory, selectDirectory] = useDirectory();

    const [rootDirectory, setRootDirectory] = useState<string>(directory);

    const findAndSetRoot: () => void = async () => {
        try {
            const newRootDirectory = await findRoot({
                fs,
                filepath: directory,
            });
            setRootDirectory(newRootDirectory);
        } catch (error) {
            setRootDirectory("");
        }
    };

    useEffect(() => {
        findAndSetRoot();
    }, [directory]);

    const inRepository: () => boolean = () => {
        return rootDirectory.length > 0;
    };

    const log: () => Promise<Commit[]> = async () => {
        const originalCommits = await gitLog({ fs, dir: rootDirectory });

        const transformedCommits = originalCommits.map<Commit>(
            ({ oid, commit }) => new Commit(oid, commit.committer.timestamp)
        );

        const oids = originalCommits.map(({ oid }) => oid);

        for (const index in transformedCommits) {
            const originalCommit = originalCommits[index];
            const transformedCommit = transformedCommits[index];

            transformedCommit.parents = originalCommit.commit.parent.map<Commit>(
                (parentOid) => transformedCommits[oids.indexOf(parentOid)]
            );

            for (const parent of transformedCommit.parents) {
                parent.children.push(transformedCommit);
            }
        }

        return transformedCommits;
    };

    return {
        selectDirectory,
        rootDirectory,
        inRepository,
        log,
    };
};

export default useRepository;
