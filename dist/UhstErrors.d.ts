export declare class InvalidToken extends Error {
    constructor(message?: string);
}
export declare class InvalidHostId extends Error {
    constructor(message?: string);
}
export declare class HostIdAlreadyInUse extends Error {
    constructor(message?: string);
}
export declare class InvalidClientOrHostId extends Error {
    constructor(message?: string);
}
export declare class RelayUnreachable extends Error {
    constructor(message?: string);
}
export declare class RelayError extends Error {
    constructor(message?: any);
}
export declare class NetworkUnreachable extends Error {
    constructor(message?: string);
}
export declare class NetworkError extends Error {
    responseCode: number;
    constructor(responseCode: number, message?: any);
}
