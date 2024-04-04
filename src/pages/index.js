import Head from 'next/head';
import PDFReader from '../components/PDFReader';
import { AppProvider } from '../components/context/AppContext';

export default function Home() {
    return (
        <AppProvider>
            <Head>
                <title>PDF Verdict with Next</title>
            </Head>
            <main className="min-h-screen bg-[#f8f4e3]">
                <PDFReader />
            </main>
        </AppProvider>
    );
}
