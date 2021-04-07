import { Message } from "../models";
export declare type SocketEventSet = {
    open: () => void;
    message: (data: any) => void;
    error: (error: Error) => void;
    close: () => void;
    diagnostic: (message: string) => void;
};
export interface UhstSocket {
    on<EventName extends keyof SocketEventSet>(eventName: EventName, handler: SocketEventSet[EventName]): any;
    once<EventName extends keyof SocketEventSet>(eventName: EventName, handler: SocketEventSet[EventName]): any;
    off<EventName extends keyof SocketEventSet>(eventName: EventName, handler: SocketEventSet[EventName]): any;
    send(message: string): Promise<any>;
    send(message: ArrayBuffer): Promise<any>;
    send(message: ArrayBufferView): Promise<any>;
    close(): any;
    handleMessage(message: Message): any;
}
