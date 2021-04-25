import { Repository } from "renderer/app/utils/git";

export interface IRepository {
    repository: Repository;
    selectDirectory: (directory?: string) => void;
    inRepository: boolean;
    isLoading: boolean;
}
