import { OpenAIStream } from '../../utils/OpenAIStrem';

export const config = {
    runtime: 'edge',
};

const createResponseFromStream = async (
    stream: ReadableStream<Uint8Array> | null,
): Promise<Response> => {
    return new Promise<Response>((resolve, reject) => {
        if (!stream) {
            const error = new Response('Something went wrong...');
            reject(error);
        } else {
            const response = new Response(stream, {
                headers: new Headers({ 'Cache-Control': 'no-cache' }),
            });
            resolve(response);
        }
    });
};

const handler = async (req: Request): Promise<Response> => {
    const reader = req.body?.getReader();
    const { value } = (await reader?.read()) as ReadableStreamReadResult<null>;
    if (value) {
        const decoder = new TextDecoder();
        const decodedText = decoder.decode(
            value as AllowSharedBufferSource | undefined,
        );
        // reader.releaseLock();
        const payload = {
            model: 'gpt-3.5-turbo-16k',
            stream: true,
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant for a pdf document.',
                },
                {
                    role: 'user',
                    content:
                        'Give me short but essential keypoints based on the report',
                },
                { role: 'user', content: decodedText },
            ],
        };
        const stream = await OpenAIStream(payload);

        return createResponseFromStream(stream);
    }

    return Promise.reject(new Response('Something went wrong...'));
};

export default handler;
