import { useEffect } from 'react';
import { useAppState } from '../components/context/AppContext';
import { createParser } from 'eventsource-parser';
import { analyseData, delay } from '../utils/readerUtil';
import { ParsedEvent, ReconnectInterval } from 'eventsource-parser/src';

const usePDFDataHandler = () => {
    const {
        allText,
        setProgress,
        setTextToShow,
        showResult,
        setGPTText,
        setIsLoading,
    } = useAppState();

    useEffect(() => {
        const onParse = (event: ParsedEvent | ReconnectInterval) => {
            if (event.type != 'event') {
                return;
            }

            const parsedData = JSON.parse(event.data) as { text: string };
            const text = parsedData.text ?? '';
            setGPTText((prev) => prev + text);
        };

        const parser = createParser(onParse);
        const batchSize = parseInt(process.env.BATCH_SIZE, 10);
        let text: string;

        const handleSendingData = async () => {
            for (let i = 0; i < allText.length; i += batchSize) {
                const endIdx = Math.min(i + batchSize, allText.length);
                const batchData = allText.slice(i, endIdx);
                const response = await analyseData(batchData);

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                await processBatchResponse(response, endIdx);
            }
        };

        const processBatchResponse = async (response, endIdx) => {
            const data = response.body;
            setTextToShow('Receiving data from OpenAI...');
            const reader = data.getReader();
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                parser.feed(chunkValue);
                text += chunkValue;
            }

            setProgress(100 - (endIdx / allText.length) * 100);
            await delay(1000);
        };

        const handleVerdict = async () => {
            const response = await analyseData(text);

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            await processVerdictResponse(response);
        };

        const processVerdictResponse = async (response) => {
            const data = response.body;
            setTextToShow('Making verdict...');
            const reader = data.getReader();
            const decoder = new TextDecoder();
            setGPTText('');
            let done = false;

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                parser.feed(chunkValue);
            }

            setProgress(0);
        };

        const handle = async () => {
            if (!showResult) return;

            await setIsLoading(true);
            try {
                await handleSendingData();
                if (batchSize < allText.length) {
                    await handleVerdict();
                }
            } catch (e) {
                console.error(e);
            }
            await setIsLoading(false);
        };

        void handle();
    }, [
        allText,
        setGPTText,
        setIsLoading,
        setProgress,
        setTextToShow,
        showResult,
    ]);
};

export default usePDFDataHandler;
