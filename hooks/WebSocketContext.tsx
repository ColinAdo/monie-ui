"use client";

import React, { createContext, useContext, ReactNode } from "react";
import useWebSocket from "react-use-websocket";

// Define the context type
interface WebSocketContextType {
    sendJsonMessage: (message: Record<string, any>) => void;
    lastJsonMessage: Record<string, any> | null;
    readyState: number;
}

// Create the WebSocket context
const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

// Props for the WebSocketProvider
interface WebSocketProviderProps {
    children: ReactNode;
}

// WebSocketProvider Component
export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const WS_URL = `${process.env.NEXT_PUBLIC_WS_HOST}/api/v1/accounts/`;

    const { sendJsonMessage, lastJsonMessage: rawLastJsonMessage, readyState } = useWebSocket(WS_URL, {
        share: true, 
        shouldReconnect: () => true, 
    });

    const lastJsonMessage = rawLastJsonMessage as Record<string, any> | null;

    return (
        <WebSocketContext.Provider value={{ sendJsonMessage, lastJsonMessage, readyState }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Hook to use the WebSocketContext
export const useWebSocketContext = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocketContext must be used within a WebSocketProvider");
    }
    return context;
};

