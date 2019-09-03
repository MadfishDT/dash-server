"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbs_1 = require("./rawdb/dbs");
class ContentsDB {
    constructor() {
        if (ContentsDB.instance) {
            throw new Error('Error - use UserDB.getInstance()');
        }
        this.db = dbs_1.MySqlDB.getInstance();
    }
    static getInstance() {
        ContentsDB.instance = ContentsDB.instance || new ContentsDB();
        return ContentsDB.instance;
    }
    getCategories() {
        return this.db.readCategories();
    }
    getQuestions(id) {
        return this.db.readQuestions(id);
    }
    getAnswers(uid) {
        return this.db.readAnswers(uid);
    }
    pushAnswers(userid, categorid, jsonData) {
        return this.db.writeAnswers(userid, categorid, jsonData);
    }
    pushAnswersConfirm(userid, categorid, jsonData) {
        return this.db.writeAnswersConfirm(userid, categorid, jsonData);
    }
    getCompanys() {
        return this.db.readCompanys();
    }
}
exports.ContentsDB = ContentsDB;
