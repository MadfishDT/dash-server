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
    removeCCategory(code) {
        return this.db.deleteCCategory(code);
    }
    pushCQuestions(categorid, data) {
        return this.db.writeCQuestion(categorid, data);
    }
    updateCCategoryName(code, name) {
        return this.db.updateCCategoryName(code, name);
    }
    updateCCategories(code, jsonData, descs) {
        return this.db.updateCCategories(code, jsonData, descs);
    }
    pushCCategories(ccode, code, data, desc) {
        return this.db.writeCCategories(ccode, code, data, desc);
    }
    pushNCCategories(code, name, userId) {
        return this.db.writeNCCategories(code, name, userId);
    }
    getCCategories(companyCode, code) {
        return this.db.readCCategories(companyCode, code);
    }
    getCCategoriesByCCode(companyCode) {
        return this.db.readCCategoriesByCCode(companyCode);
    }
    getCCategoriesByUser(userID) {
        return this.db.readCCategoriesByUser(userID);
    }
    existCompanyCode(code) {
        return this.db.existCompanyCode(code);
    }
    getCampaignsByUser(userId) {
        return this.db.readCampaignsByUser(userId);
    }
    getCampaignById(uid) {
        return this.db.readCampaignById(uid);
    }
    pushCampaign(campignInfo) {
        return this.db.writeCampaign(campignInfo);
    }
    updateCampaign(campignInfo) {
        return this.db.updateCampaign(campignInfo);
    }
    updateCampaignStatus(uid, activated) {
        return this.db.updateCampaignStatus(uid, activated);
    }
    updateCampaignTemplate(uid, ccode) {
        return this.db.updateCampaignTemplate(uid, ccode);
    }
    deleteCampaign(uid) {
        return this.db.deleteCampaign(uid);
    }
    getPortfolios(userId) {
        return this.db.readPortfolios(userId);
    }
    pushCampaignCompanyMapping(campaign, companyCodes) {
        return this.db.insertCampaignCompanyMapping(campaign, companyCodes);
    }
    getCampaignCompanyMappings(uid) {
        return this.db.readCampaignCompanyMappings(uid);
    }
    getCCategoriesByCode(code) {
        return this.db.readCCategoriesByCode(code);
    }
    getCampaignByCompany(ccode) {
        return this.db.readCampaignByCompany(ccode);
    }
}
exports.ContentsDB = ContentsDB;
