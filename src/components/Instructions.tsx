import { useAppState } from './context/AppContext';

export const Instructions = () => {
    const { gptText, errors } = useAppState();

    if (gptText || errors) return;

    return (
        <div className="relative z-10 p-4">
            <ol>
                <li className="py-2">
                    <strong>Upload Your PDF:</strong>
                    <ul>
                        <li>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Click on the "Upload file" button to select and
                            upload your PDF file.
                        </li>
                        <li>
                            Ensure your PDF file is not password-protected for
                            successful conversion.
                        </li>
                    </ul>
                </li>
                <li className="py-2">
                    <strong>Start Composing:</strong>
                    <ul>
                        <li>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            After uploading, press the "Start Composing" button
                            to initiate the parsing process.
                        </li>
                        <li>
                            Be patient as the app processes your file. The time
                            taken may vary depending on the size of your PDF.
                        </li>
                    </ul>
                </li>
                <li className="py-2">
                    <strong>Wait for Parsing:</strong>
                    <ul>
                        <li>
                            Sit tight while the app converts your PDF into
                            readable text.
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            You'll see a progress indicator to keep you
                            informed.
                        </li>
                    </ul>
                </li>
            </ol>
        </div>
    );
};

export default Instructions;
