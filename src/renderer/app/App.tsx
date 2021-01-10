import * as React from "react";
import { hot } from "react-hot-loader";

import { RepositoryContextProvider } from "renderer/app/store/Repository";
import Main from "renderer/app/main";

const App: React.FC = () => {
    return (
        <React.StrictMode>
            <RepositoryContextProvider>
                <Main />
            </RepositoryContextProvider>
        </React.StrictMode>
    );
};

export default hot(module)(App);
