import * as React from "react";
import { hot } from "react-hot-loader";

const App: React.FC = () => {
    return (
        <>
            <h1>💖 Hello World!</h1>
            <p>Welcome to your Electron application.</p>
        </>
    );
};

export default hot(module)(App);
