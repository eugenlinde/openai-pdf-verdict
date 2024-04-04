import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AppState {
    pdfInput: File | null | undefined;
    allText: string[] | [];
    gptText: string;
    showResult: boolean;
    isLoading: boolean;
    progress: number;
    errors: boolean;
    textToShow: string;
}

interface AppContextType extends AppState {
    setPdfInput: React.Dispatch<React.SetStateAction<File | null | undefined>>;
    setAllText: React.Dispatch<React.SetStateAction<string[] | []>>;
    setGPTText: React.Dispatch<React.SetStateAction<string>>;
    setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    setErrors: React.Dispatch<React.SetStateAction<boolean>>;
    setTextToShow: React.Dispatch<React.SetStateAction<string>>;
    resetState: () => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [pdfInput, setPdfInput] = useState<File | null | undefined>(
        undefined,
    );
    const [allText, setAllText] = useState<string[] | []>([]);
    const [gptText, setGPTText] = useState<string>('');
    const [showResult, setShowResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState<number>(100);
    const [errors, setErrors] = useState<boolean>(false);
    const [textToShow, setTextToShow] = useState<string>('');

    const resetState = () => {
        setPdfInput(undefined);
        setAllText([]);
        setGPTText('');
        setShowResult(false);
        setIsLoading(false);
        setProgress(100);
        setErrors(false);
        setTextToShow('');
    };

    return (
        <AppContext.Provider
            value={{
                pdfInput,
                setPdfInput,
                allText,
                setAllText,
                gptText,
                setGPTText,
                showResult,
                setShowResult,
                isLoading,
                setIsLoading,
                progress,
                setProgress,
                errors,
                setErrors,
                textToShow,
                setTextToShow,
                resetState,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useAppState = (): AppContextType => useContext(AppContext);

export { AppProvider, useAppState };
