import { useAppState } from './context/AppContext';

const Errors = () => {
    const { errors, textToShow } = useAppState();

    if (!errors) return;

    return (
        <div className="flex w-full justify-center py-4">
            <p>{textToShow ?? 'Something went wrong...'}</p>
        </div>
    );
};

export default Errors;
