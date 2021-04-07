import { UhstRelayClient, MessageHandler, MessageStream } from './contracts/UhstRelayClient';
import { ClientConfiguration, HostConfiguration } from './models';
import { NetworkClient } from './NetworkClient';
export declare class RelayClient implements UhstRelayClient {
    private relayUrl;
    networkClient: NetworkClient;
    constructor(relayUrl: string, networkClient?: NetworkClient);
    initHost(hostId?: string): Promise<HostConfiguration>;
    initClient(hostId: string): Promise<ClientConfiguration>;
    sendMessage(token: string, message: any, sendUrl?: string): Promise<void>;
    subscribeToMessages(token: string, handler: MessageHandler, receiveUrl?: string): Promise<MessageStream>;
}
