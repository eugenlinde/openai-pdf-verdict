import { useAppState } from './context/AppContext';
import { useMemo } from 'react';

const TextField = () => {
    const { errors, textToShow, gptText, isLoading } = useAppState();
    const shouldShowText = useMemo(() => {
        return textToShow !== 'Making verdict...' && isLoading;
    }, [textToShow, isLoading]);

    if (errors || !textToShow || !gptText) return;

    return (
        <div className="textfield h-full w-full py-4">
            <div
                className={`w-full p-4 ${shouldShowText ? 'text-center' : ''} min-h-[500px]`}
            >
                <p>{shouldShowText ? textToShow : gptText}</p>
            </div>
        </div>
    );
};

export default TextField;
