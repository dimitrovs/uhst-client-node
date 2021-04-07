import { UhstRelayClient } from "./contracts/UhstRelayClient";
import { UhstSocket } from "./contracts/UhstSocket";
import { UhstSocketProvider } from "./contracts/UhstSocketProvider";
import { UhstHost } from "./UhstHost";
export interface UhstOptions {
    socketProvider?: UhstSocketProvider;
    /**
     * Relay client for communication with the relay,
     * normally used for testing or if implementing
     * [[UhstRelayClient | custom  protocol]].
     * If both [[relayClient]] and [[relayUrl]] are
     * defined, then [[relayClient]] will be used.
     */
    relayClient?: UhstRelayClient;
    /**
     * Url to a server implementing the UHST relay protocol. All
     * clients connecting to the same hostId must use the same
     * relayUrl as the host.
     * If not defined and [[relayClient]] is also not defined, then
     * this library will connect to a random public relay.
     * If no relayUrl is specified on the host then the library will
     * automatically use the same random public relay for all clients
     * connecting to the same hostId.
     */
    relayUrl?: string;
    /**
     * Set to true and subscribe to "diagnostic" to receive events
     * from [[UhstSocket]].
     */
    debug?: boolean;
}
export declare class UHST {
    private relayClient;
    private debug;
    private socketProvider;
    constructor(options?: UhstOptions);
    join(hostId: string): UhstSocket;
    host(hostId?: string): UhstHost;
}
