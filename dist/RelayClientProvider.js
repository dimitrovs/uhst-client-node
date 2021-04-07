import { RelayClient } from "./RelayClient";
var RelayClientProvider = /** @class */ (function () {
    function RelayClientProvider() {
    }
    RelayClientProvider.prototype.createRelayClient = function (relayUrl) {
        return new RelayClient(relayUrl);
    };
    return RelayClientProvider;
}());
export { RelayClientProvider };
//# sourceMappingURL=RelayClientProvider.js.map