import React, { createContext, useState, ReactNode, useContext } from "react";



export const DataContext = createContext<any>(null);

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [code, setCode] = useState<string>("console.log('Welcome to Code-Share');"); 
    const [loading, setLoading] = useState<boolean>(true);
    return (
        <DataContext.Provider
            value={{
                code,
                setCode,
                loading,
                setLoading
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(DataContext);
};

export default DataProvider;
