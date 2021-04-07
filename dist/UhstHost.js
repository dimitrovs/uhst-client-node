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
import JwtDecode from "jwt-decode";
import { EventEmitter } from "inf-ee";
var UhstHost = /** @class */ (function () {
    function UhstHost(relayClient, socketProvider, requestedHostId, debug) {
        this.relayClient = relayClient;
        this.socketProvider = socketProvider;
        this.debug = debug;
        this._ee = new EventEmitter();
        this.clients = new Map();
        this.handleMessage = this.handleMessage.bind(this);
        this.init(requestedHostId);
    }
    Object.defineProperty(UhstHost.prototype, "hostId", {
        get: function () {
            return this.config.hostId;
        },
        enumerable: false,
        configurable: true
    });
    UhstHost.prototype.broadcast = function (message) {
        var _this = this;
        var envelope = {
            "type": "string",
            "payload": message
        };
        this.relayClient.sendMessage(this.config.hostToken, envelope, this.config.sendUrl).catch(function (error) {
            if (_this.debug) {
                _this._ee.emit("diagnostic", "Failed sending message: " + JSON.stringify(error));
            }
            _this._ee.emit("error", error);
        });
        if (this.debug) {
            this._ee.emit("diagnostic", "Sent message " + message);
        }
    };
    UhstHost.prototype.on = function (eventName, handler) {
        this._ee.on(eventName, handler);
    };
    UhstHost.prototype.once = function (eventName, handler) {
        this._ee.once(eventName, handler);
    };
    UhstHost.prototype.off = function (eventName, handler) {
        this._ee.off(eventName, handler);
    };
    UhstHost.prototype.disconnect = function () {
        var _a;
        (_a = this.relayMessageStream) === null || _a === void 0 ? void 0 : _a.close();
    };
    UhstHost.prototype.handleMessage = function (message) {
        var clientId = JwtDecode(message.responseToken).clientId;
        var hostSocket = this.clients.get(clientId);
        if (!hostSocket) {
            var socket = this.socketProvider.createUhstSocket(this.relayClient, { type: "host", token: message.responseToken, sendUrl: this.config.sendUrl }, this.debug);
            if (this.debug) {
                this._ee.emit("diagnostic", "Host received client connection from clientId: " + clientId);
            }
            this._ee.emit("connection", socket);
            this.clients.set(clientId, socket);
            hostSocket = socket;
        }
        hostSocket.handleMessage(message);
    };
    UhstHost.prototype.init = function (requestedHostId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this.relayClient.initHost(requestedHostId)];
                    case 1:
                        _a.config = _c.sent();
                        if (this.debug) {
                            this._ee.emit("diagnostic", "Host configuration received from server.");
                        }
                        _b = this;
                        return [4 /*yield*/, this.relayClient.subscribeToMessages(this.config.hostToken, this.handleMessage, this.config.receiveUrl)];
                    case 2:
                        _b.relayMessageStream = _c.sent();
                        if (this.debug) {
                            this._ee.emit("diagnostic", "Host subscribed to messages from server.");
                        }
                        this._ee.emit("ready");
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _c.sent();
                        if (this.debug) {
                            this._ee.emit("diagnostic", "Host failed subscribing to messages: " + JSON.stringify(error_1));
                        }
                        this._ee.emit("error", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UhstHost;
}());
export { UhstHost };
//# sourceMappingURL=UhstHost.js.map