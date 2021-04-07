export declare class RelayMessage {
    private payload;
    private payloadType;
    setPayload(message: string): Promise<void>;
    setPayload(message: ArrayBuffer): Promise<void>;
    setPayload(message: ArrayBufferView): Promise<void>;
    getPayload(): Promise<any>;
}
