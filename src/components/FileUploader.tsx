import React, { useRef, type Dispatch, type SetStateAction } from 'react';
import Button from './Button';
import { useAppState } from './context/AppContext';
import { extractText } from '../utils/readerUtil';

export const FileUploader = () => {
    const {
        isLoading,
        errors,
        gptText,
        pdfInput,
        setPdfInput,
        setProgress,
        setAllText,
        setShowResult,
        setErrors,
        setTextToShow,
    } = useAppState();
    const hiddenFileInput = useRef<HTMLInputElement | null>(null);
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        const inputElement = event.target as HTMLInputElement;
        const file = inputElement?.files?.[0] ?? null;
        setPdfInput(file);
    };
    const handleUploadClick = () => {
        if (pdfInput?.type != 'application/pdf') {
            setPdfInput(undefined);
            setErrors(true);
            setTextToShow('Select a valid PDF file');
            return;
        }

        const fr = new FileReader();
        fr.readAsDataURL(pdfInput);
        fr.onload = () => {
            if (fr.result) {
                setProgress(95);
                extractText(fr.result, setAllText, setShowResult).catch((e) =>
                    console.error(e),
                );
            }
        };
        fr.onerror = () => console.error('Failed to read file!');
    };

    if (isLoading || errors || gptText) return <div className="h-[180px]" />;

    return (
        <div>
            <Button
                text="Upload a file"
                onClick={() => {
                    hiddenFileInput.current?.click();
                }}
                className="bg-tertiary-brown"
            >
                <input
                    type="file"
                    onChange={handleChange}
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                />
            </Button>
            {pdfInput ? (
                <Button
                    text="Start composing"
                    onClick={handleUploadClick}
                    className="bg-tertiary-brown"
                />
            ) : (
                <div className="h-[90px]" />
            )}
        </div>
    );
};

export default FileUploader;
