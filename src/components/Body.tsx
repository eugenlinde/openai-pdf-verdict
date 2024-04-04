import Instructions from './Instructions';
import ResetButton from './ResetButton';
import TextField from './TextField';
import FileUploader from './FileUploader';

const Body = () => {
    return (
        <div className="relative z-10">
            <Instructions />
            <ResetButton />
            <TextField />
            <FileUploader />
        </div>
    );
};

export default Body;
