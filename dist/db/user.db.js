"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbs_1 = require("./rawdb/dbs");
class UserDB {
    constructor() {
        if (UserDB.instance) {
            throw new Error('Error - use UserDB.getInstance()');
        }
        this.db = dbs_1.MySqlDB.getInstance();
    }
    static getInstance() {
        UserDB.instance = UserDB.instance || new UserDB();
        return UserDB.instance;
    }
    getUser(id) {
        return this.db.readUser(id);
    }
    getValidUser(userinfo) {
        return this.db.readValidUser(userinfo.email, userinfo.password);
    }
    getValidAdminUser(userinfo, code) {
        return this.db.readValidAdminUser(userinfo.email, userinfo.password, code);
    }
    updateAgreement(userid) {
        return this.db.updateUserAgreement(userid);
    }
    sessionDBOptions() {
        return this.db.getSessionDBOptions();
    }
}
exports.UserDB = UserDB;
