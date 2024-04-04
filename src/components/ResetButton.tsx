import Button from './Button';
import { useAppState } from './context/AppContext';

const ResetButton = () => {
    const { isLoading, gptText, errors, resetState } = useAppState();

    if (isLoading || (!gptText && !errors)) return;

    return (
        <Button
            text="Extract Another PDF"
            onClick={() => resetState()}
            className="bg-primary-brown"
        />
    );
};

export default ResetButton;
