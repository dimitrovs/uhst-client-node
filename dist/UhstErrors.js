var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var InvalidToken = /** @class */ (function (_super) {
    __extends(InvalidToken, _super);
    function InvalidToken(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = "InvalidToken";
        return _this;
    }
    return InvalidToken;
}(Error));
export { InvalidToken };
var InvalidHostId = /** @class */ (function (_super) {
    __extends(InvalidHostId, _super);
    function InvalidHostId(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = "InvalidHostId";
        return _this;
    }
    return InvalidHostId;
}(Error));
export { InvalidHostId };
var HostIdAlreadyInUse = /** @class */ (function (_super) {
    __extends(HostIdAlreadyInUse, _super);
    function HostIdAlreadyInUse(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = "HostIdAlreadyInUse";
        return _this;
    }
    return HostIdAlreadyInUse;
}(Error));
export { HostIdAlreadyInUse };
var InvalidClientOrHostId = /** @class */ (function (_super) {
    __extends(InvalidClientOrHostId, _super);
    function InvalidClientOrHostId(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = "InvalidClientOrHostId";
        return _this;
    }
    return InvalidClientOrHostId;
}(Error));
export { InvalidClientOrHostId };
var RelayUnreachable = /** @class */ (function (_super) {
    __extends(RelayUnreachable, _super);
    function RelayUnreachable(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = "RelayUnreachable";
        return _this;
    }
    return RelayUnreachable;
}(Error));
export { RelayUnreachable };
var RelayError = /** @class */ (function (_super) {
    __extends(RelayError, _super);
    function RelayError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = "RelayError";
        return _this;
    }
    return RelayError;
}(Error));
export { RelayError };
var NetworkUnreachable = /** @class */ (function (_super) {
    __extends(NetworkUnreachable, _super);
    function NetworkUnreachable(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = "NetworkUnreachable";
        return _this;
    }
    return NetworkUnreachable;
}(Error));
export { NetworkUnreachable };
var NetworkError = /** @class */ (function (_super) {
    __extends(NetworkError, _super);
    function NetworkError(responseCode, message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.responseCode = responseCode;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = "NetworkError";
        return _this;
    }
    return NetworkError;
}(Error));
export { NetworkError };
//# sourceMappingURL=UhstErrors.js.map