import { UhstRelayClient } from "./contracts/UhstRelayClient";
import { UhstSocket } from "./contracts/UhstSocket";
import { UhstSocketProvider } from "./contracts/UhstSocketProvider";
import { ClientSocketParams, HostSocketParams } from "./models";
export declare class RelaySocketProvider implements UhstSocketProvider {
    createUhstSocket(relayClient: UhstRelayClient, params: ClientSocketParams | HostSocketParams, debug: boolean): UhstSocket;
}
