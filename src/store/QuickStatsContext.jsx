import { createContext } from "react";

export const QuickStatsContext = createContext();

export default function QuickStatsProvider({children}) {

    
    return (
        <QuickStatsContext.Provider
            value = {{

            }}
        >
            {children}
        </QuickStatsContext.Provider>
    )
}