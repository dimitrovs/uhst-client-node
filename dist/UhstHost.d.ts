import { UhstRelayClient } from "./contracts/UhstRelayClient";
import { UhstSocket } from "./contracts/UhstSocket";
import { UhstSocketProvider } from "./contracts/UhstSocketProvider";
declare type HostEventSet = {
    ready: () => void;
    connection: (socket: UhstSocket) => void;
    error: (error: Error) => void;
    diagnostic: (message: string) => void;
};
export declare class UhstHost {
    private relayClient;
    private socketProvider;
    private debug;
    private _ee;
    private clients;
    private config;
    private relayMessageStream;
    constructor(relayClient: UhstRelayClient, socketProvider: UhstSocketProvider, requestedHostId: string | undefined, debug: boolean);
    get hostId(): string;
    broadcast(message: string): void;
    broadcast(message: ArrayBuffer): void;
    broadcast(message: ArrayBufferView): void;
    on<EventName extends keyof HostEventSet>(eventName: EventName, handler: HostEventSet[EventName]): void;
    once<EventName extends keyof HostEventSet>(eventName: EventName, handler: HostEventSet[EventName]): void;
    off<EventName extends keyof HostEventSet>(eventName: EventName, handler: HostEventSet[EventName]): void;
    disconnect(): void;
    private handleMessage;
    private init;
}
export {};
