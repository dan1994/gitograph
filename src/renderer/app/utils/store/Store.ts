import Store from "electron-store";

const store = new Store({
    schema: {
        recentRepositories: {
            type: "array",
            items: {
                type: "string",
            },
            default: [],
        },
    },
});

export default store;
