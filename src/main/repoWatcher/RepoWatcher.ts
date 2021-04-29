import chokidar from "chokidar";

class RepoWatcher {
    public directory: string;
    private watcher: chokidar.FSWatcher;
    private changeOccurred: boolean;

    constructor() {
        this.directory = null;
        this.watcher = null;
        this.changeOccurred = false;
    }

    public watch: (directory: string) => Promise<void> = async (directory) => {
        await this.stop();
        this.directory = directory;
        this.watcher = chokidar.watch(directory).on("all", () => {
            this.changeOccurred = true;
        });
    };

    public didChangeOccur: () => boolean = () => {
        const savedValue = this.changeOccurred;
        this.changeOccurred = false;
        return savedValue;
    };

    private stop: () => Promise<void> = async () => {
        this.directory = null;
        if (this.watcher) {
            await this.watcher.close();
        }
    };
}

export default RepoWatcher;
