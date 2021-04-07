var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { EventEmitter } from "inf-ee";
var RelaySocket = /** @class */ (function () {
    function RelaySocket(relayClient, params, debug) {
        var _this = this;
        this.relayClient = relayClient;
        this.debug = debug;
        this._ee = new EventEmitter();
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
                setImmediate(function () {
                    _this._ee.emit("open");
                });
                break;
            default:
                throw Error("Unsupported Socket Parameters Type");
        }
    }
    RelaySocket.prototype.on = function (eventName, handler) {
        this._ee.on(eventName, handler);
    };
    RelaySocket.prototype.once = function (eventName, handler) {
        this._ee.once(eventName, handler);
    };
    RelaySocket.prototype.off = function (eventName, handler) {
        this._ee.off(eventName, handler);
    };
    RelaySocket.prototype.send = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var envelope;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        envelope = {
                            "type": "string",
                            "payload": message
                        };
                        return [4 /*yield*/, this.relayClient.sendMessage(this.token, envelope, this.sendUrl).catch(function (error) {
                                if (_this.debug) {
                                    _this._ee.emit("diagnostic", "Failed sending message: " + JSON.stringify(error));
                                }
                                _this._ee.emit("error", error);
                            })];
                    case 1:
                        _a.sent();
                        if (this.debug) {
                            this._ee.emit("diagnostic", "Sent message " + message);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RelaySocket.prototype.close = function () {
        var _a;
        (_a = this.relayMessageStream) === null || _a === void 0 ? void 0 : _a.close();
    };
    RelaySocket.prototype.handleMessage = function (message) {
        var payload = message.body.payload;
        if (this.debug) {
            this._ee.emit("diagnostic", "Message received: " + payload);
        }
        this._ee.emit("message", payload);
    };
    RelaySocket.prototype.initClient = function (hostId) {
        return __awaiter(this, void 0, void 0, function () {
            var config, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.relayClient.initClient(hostId)];
                    case 1:
                        config = _b.sent();
                        if (this.debug) {
                            this._ee.emit("diagnostic", "Client configuration received from server.");
                        }
                        this.token = config.clientToken;
                        this.sendUrl = config.sendUrl;
                        _a = this;
                        return [4 /*yield*/, this.relayClient.subscribeToMessages(config.clientToken, this.handleMessage, config.receiveUrl)];
                    case 2:
                        _a.relayMessageStream = _b.sent();
                        if (this.debug) {
                            this._ee.emit("diagnostic", "Client subscribed to messages from server.");
                        }
                        this._ee.emit("open");
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        if (this.debug) {
                            this._ee.emit("diagnostic", "Client failed: " + JSON.stringify(error_1));
                        }
                        this._ee.emit("error", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return RelaySocket;
}());
export { RelaySocket };
//# sourceMappingURL=RelaySocket.js.map