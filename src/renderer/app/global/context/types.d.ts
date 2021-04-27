import { Repository } from "renderer/app/utils/git";

export interface IRepository {
    repository: Repository;
    selectDirectory: (directory?: string) => void;
    closeRepository: () => void;
    inRepository: boolean;
    isLoading: boolean;
}
