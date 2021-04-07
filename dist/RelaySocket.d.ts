import { UhstRelayClient } from "./contracts/UhstRelayClient";
import { SocketEventSet, UhstSocket } from "./contracts/UhstSocket";
import { ClientSocketParams, HostSocketParams, Message } from "./models";
export declare class RelaySocket implements UhstSocket {
    private relayClient;
    private debug;
    private _ee;
    private token;
    private relayMessageStream;
    private sendUrl?;
    constructor(relayClient: UhstRelayClient, params: HostSocketParams | ClientSocketParams, debug: boolean);
    on<EventName extends keyof SocketEventSet>(eventName: EventName, handler: SocketEventSet[EventName]): void;
    once<EventName extends keyof SocketEventSet>(eventName: EventName, handler: SocketEventSet[EventName]): void;
    off<EventName extends keyof SocketEventSet>(eventName: EventName, handler: SocketEventSet[EventName]): void;
    send(message: string): Promise<any>;
    send(message: ArrayBuffer): Promise<any>;
    send(message: ArrayBufferView): Promise<any>;
    close(): void;
    handleMessage(message: Message): void;
    private initClient;
}
