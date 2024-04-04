import {
    createParser,
    type ParsedEvent,
    type ReconnectInterval,
} from 'eventsource-parser';
import { ParsedJSON } from '../types/types';

export async function OpenAIStream(payload: {
    model: string;
    stream: boolean;
    messages: { role: string; content: string }[];
}) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const res = await fetch(process.env.OPENAI_API_URL, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
        },
        method: 'POST',
        body: JSON.stringify(payload),
    });

    const readableStream = new ReadableStream({
        async start(controller) {
            const onParse = (event: ParsedEvent | ReconnectInterval) => {
                if (event.type === 'event') {
                    const data = event.data;
                    controller.enqueue(encoder.encode(data));
                }
            };

            if (res.status !== 200) {
                const data = {
                    status: res.status,
                    statusText: res.statusText,
                    body: await res.text(),
                };
                console.log(
                    `Error: received non-200 status code, ${JSON.stringify(data)}`,
                );
                controller.close();
                return;
            }

            const parser = createParser(onParse);
            return res.body.pipeThrough(new TextDecoderStream()).pipeTo(
                new WritableStream({
                    write(chunk) {
                        parser.feed(chunk);
                    },
                    close() {
                        console.log('Stream closed');
                    },
                    abort(reason) {
                        console.error('Stream aborted:', reason);
                    },
                }),
            );
        },
    });

    let counter = 0;
    const transformStream = new TransformStream({
        async transform(chunk, controller) {
            const data = decoder.decode(chunk);
            if (data === '[DONE]') {
                controller.terminate();
                return;
            }
            try {
                const parsedJson: ParsedJSON = JSON.parse(data);
                const firstElement = parsedJson.choices.shift();
                const text = firstElement?.delta?.content;
                if (counter < 2 && (text?.match(/\n/) ?? []).length) {
                    return;
                }
                const payload = { text: text };
                controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify(payload)}\n\n`),
                );
                counter++;
            } catch (e) {
                console.error('error during stream: ', e);
            }
        },
    });

    return readableStream.pipeThrough(transformStream);
}
