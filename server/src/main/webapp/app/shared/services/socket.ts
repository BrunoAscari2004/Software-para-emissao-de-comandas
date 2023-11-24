import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';

export interface ISocketChannel {
    destination: string;
    headers: Record<string, any>;
}

const Socket = {
    connect: () =>
        new Promise<Stomp.Client>((resolve, reject) => {
            const stompClient = Stomp.over(new SockJS(location.protocol + '//' + location.host + '/NLWebII/ws'));
            stompClient.connect({}, () => resolve(stompClient), reject);
        }),
    disconnect: (stompClient: Stomp.Client) =>
        new Promise<void>(resolve => {
            if (!stompClient.disconnect) resolve();
            stompClient.disconnect(() => resolve());
        }),
    subscribe<T extends any>(
        stompClient: Stomp.Client,
        socketChannel: ISocketChannel,
        onReceiveMessage: (payload: T, message: Stomp.Message) => void,
    ) {
        return stompClient.subscribe(
            socketChannel.destination,
            message => {
                let payload;
                try {
                    payload = JSON.parse(message.body);
                } catch {
                    payload = message.body;
                }
                onReceiveMessage(payload, message);
            },
            socketChannel.headers,
        ).id;
    },
    unsubscribe(stompClient: Stomp.Client, id: string) {
        stompClient.unsubscribe(id);
    },
};

let globalStomp: Promise<Stomp.Client> | null = null;
let settedCallback = false;

export const useSocket = (onConnect?: () => void) => {
    const stompPromise = globalStomp || (globalStomp = Socket.connect());
    const destinationsIds: Record<string, string> = {};

    if (!settedCallback) stompPromise.then(onConnect);
    settedCallback = true;

    return {
        disconnect() {
            globalStomp = null;
            stompPromise.then(stomp => Socket.disconnect(stomp));
        },
        subscribe<Response extends any>(
            destination: ISocketChannel['destination'],
            listener: (payload: Response, message: Stomp.Message) => void,
            stompConfiguration?: ISocketChannel,
        ) {
            stompPromise.then(stomp => {
                const subscriptionId = Socket.subscribe(
                    stomp,
                    {
                        destination,
                        headers: stompConfiguration?.headers ?? [],
                    },
                    listener,
                );
                destinationsIds[destination] = subscriptionId;
            });
        },
        unsubscribe(destination: ISocketChannel['destination']) {
            stompPromise.then(stomp => {
                const id = destinationsIds[destination];
                if (id) Socket.unsubscribe(stomp, id);
                delete destinationsIds[destination];
            });
        },
        unsubscribeAll(destinationRegEx?: RegExp) {
            stompPromise.then(stomp =>
                Object.entries(destinationsIds)
                    .filter(([destination, _id]) => !destinationRegEx || destination.match(destinationRegEx))
                    .forEach(([destination, id]) => {
                        Socket.unsubscribe(stomp, id);
                        delete destinationsIds[destination];
                    }),
            );
        },
        send: (destination: string, headers?: ISocketChannel['headers'], body?: string) =>
            stompPromise.then(stomp => stomp.send(destination, headers, body)),
    };
};

export default Socket;
