var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import fetch from 'node-fetch';
import EventSource from 'eventsource';
import { InvalidToken, InvalidHostId, HostIdAlreadyInUse, RelayError, RelayUnreachable, InvalidClientOrHostId, NetworkError, } from './UhstErrors';
import { NetworkClient } from './NetworkClient';
var REQUEST_OPTIONS = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};
var RelayClient = /** @class */ (function () {
    function RelayClient(relayUrl, networkClient) {
        this.relayUrl = relayUrl;
        this.networkClient = networkClient !== null && networkClient !== void 0 ? networkClient : new NetworkClient();
    }
    RelayClient.prototype.initHost = function (hostId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.networkClient.post(this.relayUrl, hostId ? ['action=host', "hostId=" + hostId] : ['action=host'])];
                }
                catch (error) {
                    if (error instanceof NetworkError) {
                        if (error.responseCode == 400) {
                            throw new HostIdAlreadyInUse(error.message);
                        }
                        else {
                            throw new RelayError(error.message);
                        }
                    }
                    else {
                        console.log(error);
                        throw new RelayUnreachable(error);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    RelayClient.prototype.initClient = function (hostId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.networkClient.post(this.relayUrl, [
                            'action=join',
                            "hostId=" + hostId,
                        ])];
                }
                catch (error) {
                    if (error instanceof NetworkError) {
                        if (error.responseCode == 400) {
                            throw new InvalidHostId(error.message);
                        }
                        else {
                            throw new RelayError(error.message);
                        }
                    }
                    else {
                        console.log(error);
                        throw new RelayUnreachable(error);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    RelayClient.prototype.sendMessage = function (token, message, sendUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = sendUrl !== null && sendUrl !== void 0 ? sendUrl : this.relayUrl;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch(url + "?token=" + token, __assign(__assign({}, REQUEST_OPTIONS), { body: JSON.stringify(message) }))];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new RelayUnreachable(error_1);
                    case 4:
                        if (response.status == 200) {
                            return [2 /*return*/];
                        }
                        else if (response.status == 400) {
                            throw new InvalidClientOrHostId(response.statusText);
                        }
                        else if (response.status == 401) {
                            throw new InvalidToken(response.statusText);
                        }
                        else {
                            throw new RelayError(response.status + " " + response.statusText);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RelayClient.prototype.subscribeToMessages = function (token, handler, receiveUrl) {
        var url = receiveUrl !== null && receiveUrl !== void 0 ? receiveUrl : this.relayUrl;
        return new Promise(function (resolve, reject) {
            var stream = new EventSource(url + "?token=" + token);
            stream.onopen = function (ev) {
                resolve(stream);
            };
            stream.onerror = function (ev) {
                reject(new RelayError(ev));
            };
            stream.addEventListener('message', function (evt) {
                var message = JSON.parse(evt.data);
                handler(message);
            });
        });
    };
    return RelayClient;
}());
export { RelayClient };
//# sourceMappingURL=RelayClient.js.map