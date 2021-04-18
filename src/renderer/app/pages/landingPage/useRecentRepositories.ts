import { useState, useEffect } from "react";
import store from "renderer/app/utils/store/Store";

interface IRecentRepositories {
    recentRepositories: string[];
    addRecentRepository: (reppsitoryPath: string) => void;
    removeRecentRepository: (reppsitoryPath: string) => void;
}

const useRecentRepositories: () => IRecentRepositories = () => {
    const [recentRepositories, setRecentRepositories] = useState(
        store.get("recentRepositories") as string[]
    );

    const addRecentRepository: (repositoryPath: string) => void = (
        repositoryPath
    ) => {
        const newRecentRepositories = recentRepositories.filter(
            (recentRepository) => recentRepository !== repositoryPath
        );
        newRecentRepositories.unshift(repositoryPath);
        console.log(newRecentRepositories);
        updateRecentRepositories(newRecentRepositories);
    };

    const removeRecentRepository: (repositoryPath: string) => void = (
        repositoryPath
    ) => {
        const newRecentRepositories = recentRepositories.filter(
            (recentRepository) => recentRepository !== repositoryPath
        );
        updateRecentRepositories(newRecentRepositories);
    };

    const updateRecentRepositories: (
        newRecentRepositories: string[]
    ) => void = (newRecentRepositories) => {
        store.set("recentRepositories", newRecentRepositories);
    };

    useEffect(() => {
        const unsubscribe = store.onDidChange(
            "recentRepositories",
            (newValue) => {
                setRecentRepositories(newValue as string[]);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    return {
        recentRepositories,
        addRecentRepository,
        removeRecentRepository,
    };
};

export default useRecentRepositories;
