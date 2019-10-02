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
    getCategories(companyCode) {
        return this.db.readCategories(companyCode);
    }
    getQuestions(id) {
        return this.db.readQuestions(id);
    }
    getAnswersById(answerId) {
        return this.db.readAnswersById(answerId);
    }
    getAnswers(categoryid, userid) {
        return this.db.readAnswers(categoryid, userid);
    }
    getUserAnswers(categoryid) {
        return this.db.readUserAnswers(categoryid);
    }
    pushAnswers(userid, categorid, questionsid, jsonData) {
        return this.db.writeAnswers(userid, categorid, questionsid, jsonData);
    }
    getCompanys() {
        return this.db.readCompanys();
    }
    getCQuestion(id) {
        return this.db.readCQuestion(id);
    }
    getCQuestionRevision(id, revision) {
        return this.db.readCQuestionRevision(id, revision);
    }
    pushCQuestions(categorid, data) {
        return this.db.writeCQuestion(categorid, data);
    }
    pushCCategories(ccode, code, data, desc) {
        return this.db.writeCCategories(ccode, code, data, desc);
    }
    getCCategories(companyCode, code) {
        return this.db.readCCategories(companyCode, code);
    }
    getCCategoriesByCCode(companyCode) {
        return this.db.readCCategoriesByCCode(companyCode);
    }
    existCompanyCode(code) {
        return this.db.existCompanyCode(code);
    }
}
exports.ContentsDB = ContentsDB;
