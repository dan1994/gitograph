import * as React from "react";
import { useState, createContext, useContext } from "react";

type IMessageType = "info" | "error";

interface IMessageInfo {
    type: IMessageType;
    title: string;
    message: string;
}

interface IMessageBoxState {
    messageInfo: IMessageInfo;
    displayInfo: (title: string, message?: string) => void;
    displayError: (title: string, message?: string) => void;
    clearMessage: () => void;
}

const useMessageBox: () => IMessageBoxState = () => {
    const [messageInfo, setMessageInfo] = useState<IMessageInfo>({
        type: "info",
        title: "",
        message: "",
    });

    const displayInfo: (title: string, message?: string) => void = (
        title,
        message
    ) => {
        clearMessage();
        setMessageInfo({ type: "info", title, message });
    };

    const displayError: (title: string, message?: string) => void = (
        title,
        message
    ) => {
        clearMessage();
        setMessageInfo({ type: "error", title, message });
    };

    const clearMessage: () => void = () => {
        setMessageInfo({ ...messageInfo, title: "", message: "" });
    };

    return { messageInfo, displayInfo, displayError, clearMessage };
};

const MessageBoxContext = createContext(null);

const MessageBoxContextProvider: React.FC<{
    children?: React.ReactNode;
}> = ({ children }) => {
    return (
        <MessageBoxContext.Provider value={useMessageBox()}>
            {children}
        </MessageBoxContext.Provider>
    );
};

const useMessageBoxContext: () => IMessageBoxState = () =>
    useContext<IMessageBoxState>(MessageBoxContext);

export { MessageBoxContextProvider, useMessageBoxContext };
