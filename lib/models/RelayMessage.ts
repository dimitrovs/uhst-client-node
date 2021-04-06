enum PayloadType {
    STRING = "string"
}

export class RelayMessage {
    private payload: string;
    private payloadType: PayloadType;

    async setPayload(message: string): Promise<void>;
    async setPayload(message: ArrayBuffer): Promise<void>;
    async setPayload(message: ArrayBufferView): Promise<void>;
    async setPayload(message: any): Promise<void> {
        switch (typeof message) {
            case "string":
                this.payload = message;
                this.payloadType = PayloadType.STRING;
                break;
            default:
                throw Error("Unsupported message type.");
        }
    }

    async getPayload():Promise<any> {
        switch(this.payloadType) {
            case PayloadType.STRING:
                return this.payload;
        }

    }
}