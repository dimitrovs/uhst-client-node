import { RelayClient } from "./RelayClient";
import { ApiClient } from "./ApiClient";
import { UhstHost } from "./UhstHost";
import { RelaySocketProvider } from "./RelaySocketProvider";
import { RelayClientProvider } from "./RelayClientProvider";
var UHST = /** @class */ (function () {
    function UHST(options) {
        if (options === void 0) { options = {}; }
        var _a, _b;
        this.debug = (_a = options.debug) !== null && _a !== void 0 ? _a : false;
        if (options.relayClient) {
            this.relayClient = options.relayClient;
        }
        else if (options.relayUrl) {
            this.relayClient = new RelayClient(options.relayUrl);
        }
        else {
            this.relayClient = new ApiClient(new RelayClientProvider());
        }
        this.socketProvider = (_b = options.socketProvider) !== null && _b !== void 0 ? _b : new RelaySocketProvider();
    }
    UHST.prototype.join = function (hostId) {
        return this.socketProvider.createUhstSocket(this.relayClient, { type: "client", hostId: hostId }, this.debug);
    };
    UHST.prototype.host = function (hostId) {
        return new UhstHost(this.relayClient, this.socketProvider, hostId, this.debug);
    };
    return UHST;
}());
export { UHST };
//# sourceMappingURL=UHST.js.map