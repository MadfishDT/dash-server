"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_token_generator_1 = require("ts-token-generator");
class Gernerators {
    constructor() {
    }
    static bootstrap() {
        return new Gernerators();
    }
    tokenGenerated() {
        const tokgen = new ts_token_generator_1.TokenGenerator(); // Default is a 128-bit token encoded in base58
        return tokgen.generate();
    }
}
exports.Gernerators = Gernerators;
