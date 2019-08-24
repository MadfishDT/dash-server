"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseUtils {
    constructor() {
    }
    static responseUnauthorized(res) {
        try {
            res.sendStatus(401);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    static responseSuccessJson(res, data) {
        try {
            res.json(data);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
exports.ResponseUtils = ResponseUtils;
