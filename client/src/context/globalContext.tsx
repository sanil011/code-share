import React, { createContext, useState, ReactNode, useContext } from "react";



export const DataContext = createContext<any>(null);

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [code, setCode] = useState<string>("console.log('Welcome to Code-Share');"); // Specify the type for code (string)
    return (
        <DataContext.Provider
            value={{
                code,
                setCode
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
