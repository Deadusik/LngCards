import { FC, createContext, useContext } from "react"

interface HomeContextType {
    onLinkClick: () => void
}

const HomeContext = createContext<HomeContextType | null>(null)

export const HomeProvider: FC<HomeContextType> = ({ onLinkClick }, children) => {
    return <HomeContext.Provider value={{ onLinkClick }}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => {
    const context = useContext(HomeContext);
    if (!context) {
        throw new Error('useHomeContext must be used within an HomeProvider');
    }
    return context;
};