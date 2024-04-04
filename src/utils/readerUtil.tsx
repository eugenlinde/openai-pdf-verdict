import * as pdfjsLib from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

export const delay = (milliseconds: number) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

export const analyseData = async (data): Promise<Response> => {
    return await fetch('api/analyse', {
        method: 'POST',
        body: JSON.stringify({ data }),
    });
};

const extractTextForBatch = async (
    pdf: pdfjsLib.PDFDocumentProxy,
    startPage: number,
    endPage: number,
) => {
    const batchText = [];
    for (let i = startPage; i <= endPage; i++) {
        const page = await pdf.getPage(i);
        const txt = await page.getTextContent();
        const items = txt.items as TextItem[];
        const text = items.map((s) => s.str).join('');
        batchText.push(text);
    }
    return batchText;
};

export const extractText = async (
    data: string | ArrayBuffer,
    setAllText,
    setShowResult,
) => {
    try {
        const pdf = await pdfjsLib.getDocument(data).promise;
        const pages = pdf.numPages;
        const extractedText = [];
        const batchSize = 5;
        for (let i = 1; i <= pages; i += batchSize) {
            const endPage = Math.min(i + batchSize - 1, pages);
            const batchText = await extractTextForBatch(pdf, i, endPage);
            extractedText.push(...batchText);
        }
        setAllText(extractedText);
        setShowResult(true);
    } catch (err) {
        if (err instanceof Error) {
            alert(err.message);
        } else {
            alert('something went wrong!');
        }
    }
};
