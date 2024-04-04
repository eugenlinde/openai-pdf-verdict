import { useAppState } from './context/AppContext';

const Loading = () => {
    const { progress } = useAppState();

    return (
        <div
            className={`absolute left-0 right-0 bottom-0 transition-all duration-500 ${
                progress === 0 ? 'rounded-lg' : 'rounded-b-lg'
            } bg-secondary-brown`}
            style={{ top: `${progress}%` }}
        />
    );
};

export default Loading;
