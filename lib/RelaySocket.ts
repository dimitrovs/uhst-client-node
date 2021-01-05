import { EventEmitter } from "inf-ee";
import { MessageStream, UhstApiClient } from "./contracts/UhstApiClient";
import { SocketEventSet, UhstSocket } from "./contracts/UhstSocket";
import { ClientSocketParams, HostSocketParams, Message } from "./models";

export class RelaySocket implements UhstSocket {
    private _ee = new EventEmitter<SocketEventSet>();
    private token: string;
    private apiMessageStream: MessageStream;
    private sendUrl?: string;

    constructor(private apiClient: UhstApiClient, params: HostSocketParams | ClientSocketParams, private debug: boolean) {
        this.send = this.send.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.close = this.close.bind(this);

        switch (params.type) {
            case "client":
                // will connect to host
                this.initClient(params.hostId);
                break;
            case "host":
                // client connected
                this.token = params.token;
                this.sendUrl = params.sendUrl;
                // give consumer a chance to subscribe to open event
                setTimeout(() => {
                    this._ee.emit("open");
                });
                break;
            default:
                throw Error("Unsupported Socket Parameters Type");
        }
    }

    on<EventName extends keyof SocketEventSet>(eventName: EventName, handler: SocketEventSet[EventName]) {
        this._ee.on(eventName, handler);
    }

    once<EventName extends keyof SocketEventSet>(eventName: EventName, handler: SocketEventSet[EventName]) {
        this._ee.once(eventName, handler);
    }

    off<EventName extends keyof SocketEventSet>(eventName: EventName, handler: SocketEventSet[EventName]) {
        this._ee.off(eventName, handler);
    }
    
    send(message: string): void;
    send(message: Blob): void;
    send(message: ArrayBuffer): void;
    send(message: ArrayBufferView): void;
    send(message: any) {
        const envelope = {
            "type": "string",
            "payload": message
        }
        this.apiClient.sendMessage(this.token, envelope, this.sendUrl).catch((error) => {
            if (this.debug) { this._ee.emit("diagnostic", "Failed sending message: " + JSON.stringify(error)); }
            this._ee.emit("error", error);
        });
        if (this.debug) { this._ee.emit("diagnostic", "Sent message " + message); }
    }

    close() {
        this.apiMessageStream?.close();
    }

    handleMessage(message: Message) {
        const payload = message.body.payload
        if (this.debug) { this._ee.emit("diagnostic", "Message received: " + payload); }
        this._ee.emit("message", payload);
    }

    private async initClient(hostId: string) {
        try {
            const config = await this.apiClient.initClient(hostId);
            if (this.debug) { this._ee.emit("diagnostic", "Client configuration received from server."); }
            this.token = config.clientToken;
            this.sendUrl = config.sendUrl;
            this.apiMessageStream = await this.apiClient.subscribeToMessages(config.clientToken, this.handleMessage, config.receiveUrl);
            if (this.debug) { this._ee.emit("diagnostic", "Client subscribed to messages from server."); }
            this._ee.emit("open");
        } catch (error) {
            if (this.debug) { this._ee.emit("diagnostic", "Client failed: " + JSON.stringify(error)); }
            this._ee.emit("error", error);
        }
    }
    
}