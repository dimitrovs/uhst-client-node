import { MessageHandler, MessageStream, UhstRelayClient } from './contracts/UhstRelayClient';
import { HostConfiguration, ClientConfiguration } from './models';
import { NetworkClient } from './NetworkClient';
import { RelayClient } from './RelayClient';
import { RelayClientProvider } from './RelayClientProvider';
export declare class ApiClient implements UhstRelayClient {
    private relayClientProvider;
    networkClient: NetworkClient;
    relayClient: RelayClient;
    constructor(relayClientProvider: RelayClientProvider, networkClient?: NetworkClient);
    getRelayUrl(hostId?: string): Promise<string>;
    initHost(hostId?: string): Promise<HostConfiguration>;
    initClient(hostId: string): Promise<ClientConfiguration>;
    sendMessage(token: string, message: any, sendUrl?: string): Promise<any>;
    subscribeToMessages(token: string, handler: MessageHandler, receiveUrl?: string): Promise<MessageStream>;
}
