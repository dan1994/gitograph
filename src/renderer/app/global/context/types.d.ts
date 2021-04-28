import { Repository } from "renderer/app/utils/git";

export interface IRepository {
    repository: Repository;
    selectDirectory: (directory?: string) => Promise<void>;
    refreshRepository: () => Promise<void>;
    closeRepository: () => Promise<void>;
    inRepository: boolean;
    isLoading: boolean;
}
