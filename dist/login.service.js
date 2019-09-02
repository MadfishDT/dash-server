"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const generators_1 = require("./generators");
const user_db_1 = require("./db/user.db");
const rx = __importStar(require("rx"));
class LoginSerivce {
    static bootstrap() {
        return new LoginSerivce();
    }
    constructor() {
        this.validTokens = new Map();
        this.generators = generators_1.Gernerators.bootstrap();
        this.loginRequestSubject = new rx.Subject();
        this.userDB = user_db_1.UserDB.getInstance();
        this.loginRequestSubject.subscribe((info) => __awaiter(this, void 0, void 0, function* () {
            yield this.tryLogin(info);
        }));
    }
    extentdToken(token) {
        let findToken = this.validTokens.get(token);
        if (findToken) {
            this.validTokens.set(token, new Date());
            return true;
        }
        return false;
    }
    validateToken(token) {
        let time = this.validTokens.get(token);
        if (time) {
            const now = new Date();
            let diff = (now.getTime() - time.getTime()) / 1000;
            if (diff > 6000) {
                this.validTokens.delete(token);
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    }
    tryLogout(token) {
        return new Promise((resolve) => {
            if (this.validTokens.get(token)) {
                this.validTokens.delete(token);
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }
    updateAgreement(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userDB.updateAgreement(userid);
            return result;
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.userDB.getUser(id);
            console.log(result);
            return result;
        });
    }
    tryAdminLogin(info, code) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this.userDB.getValidAdminUser(info, code);
                if (result) {
                    console.log(`success find user: ${result}`);
                    resolve(result);
                    return;
                }
                else {
                    console.log('login fail');
                }
                resolve(null);
                return;
            }
            catch (e) {
                resolve(null);
            }
        }));
    }
    tryLogin(info) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this.userDB.getValidUser(info);
                if (result) {
                    console.log(`success find user: ${result}`);
                    resolve(result);
                    return;
                }
                else {
                    console.log('login fail');
                }
                resolve(null);
                return;
            }
            catch (e) {
                resolve(null);
            }
        }));
    }
}
exports.LoginSerivce = LoginSerivce;
