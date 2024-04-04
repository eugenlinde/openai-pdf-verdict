import 'pdfjs-dist/build/pdf.worker.min';
import usePDFDataHandler from '../hooks/usePDFDataHandler';
import Errors from './Errors';
import Loading from './Loading';
import Body from './Body';
import Title from './Head';

function PDFReader() {
    usePDFDataHandler();

    return (
        <div className="flex justify-center px-4 py-16">
            <div className="relative w-full max-w-md rounded-lg bg-[#fffffa] p-4 font-mono shadow-2xl">
                <Title />
                <Errors />
                <Body />
                <Loading />
            </div>
        </div>
    );
}

export default PDFReader;
