import { FC, createContext, useContext } from "react"

interface HomeContextType {
    isSearchBlockShowed?: boolean
    isCardsBlockShowed?: boolean
    setIsSearchBlockShowed?: React.Dispatch<React.SetStateAction<boolean>>
    setIsCardsBlockShowed?: React.Dispatch<React.SetStateAction<boolean>>
}

const HomeContext = createContext<HomeContextType | null>(null)

export const HomeProvider: FC<HomeContextType> = ({ isSearchBlockShowed, isCardsBlockShowed, setIsSearchBlockShowed, setIsCardsBlockShowed }, children) => {
    return <HomeContext.Provider value={{
        isSearchBlockShowed,
        isCardsBlockShowed,
        setIsSearchBlockShowed,
        setIsCardsBlockShowed
    }}>
        {children}
    </HomeContext.Provider>;
};

export const useHomeContext = () => {
    const context = useContext(HomeContext);
    if (!context) {
        throw new Error('useHomeContext must be used within an HomeProvider');
    }
    return context;
};