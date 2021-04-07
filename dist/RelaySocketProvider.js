import { RelaySocket } from "./RelaySocket";
var RelaySocketProvider = /** @class */ (function () {
    function RelaySocketProvider() {
    }
    RelaySocketProvider.prototype.createUhstSocket = function (relayClient, params, debug) {
        return new RelaySocket(relayClient, params, debug);
    };
    return RelaySocketProvider;
}());
export { RelaySocketProvider };
//# sourceMappingURL=RelaySocketProvider.js.map