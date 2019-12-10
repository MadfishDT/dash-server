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
const contents_db_1 = require("./db/contents.db");
const rx = __importStar(require("rx"));
const uuidv1 = __importStar(require("uuid/v1"));
class ContentsService {
    static bootstrap() {
        return new ContentsService();
    }
    constructor() {
        this.generators = generators_1.Gernerators.bootstrap();
        this.categoriesSubject = new rx.Subject();
        this.contentsDB = contents_db_1.ContentsDB.getInstance();
    }
    getNewUID() {
        let guid = uuidv1.default();
        return guid;
    }
    getCategories(companyCode) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.contentsDB.getCategories(companyCode);
            return result;
        });
    }
    getQuestions(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.contentsDB.getQuestions(id);
            return result;
        });
    }
    getAnswers(cid, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.contentsDB.getAnswers(cid, userID);
            return result;
        });
    }
    getAnswersById(answerId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.contentsDB.getAnswersById(answerId);
            return result;
        });
    }
    getUserAnswers(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.contentsDB.getUserAnswers(cid);
            return result;
        });
    }
    pushAnswers(userid, categoryid, questionid, answers) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.contentsDB.pushAnswers(userid, categoryid, questionid, answers);
            return result;
        });
    }
    getCompanys() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.contentsDB.getCompanys();
            return result;
        });
    }
    getCQuestion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contentsDB.getCQuestion(id);
        });
    }
    getCQuestionRevision(id, revision) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contentsDB.getCQuestionRevision(id, revision);
        });
    }
    pushCQuestions(categorid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contentsDB.pushCQuestions(categorid, data);
        });
    }
    updateCCategoryName(code, name) {
        return this.contentsDB.updateCCategoryName(code, name);
    }
    updateCCategories(code, jsonData, descs) {
        return this.contentsDB.updateCCategories(code, jsonData, descs);
    }
    pushCCategories(ccode, code, data, desc) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contentsDB.pushCCategories(ccode, code, data, desc);
        });
    }
    pushNCCategories(code, name, userid) {
        return this.contentsDB.pushNCCategories(code, name, userid);
    }
    getCCategories(companyCode, code) {
        return this.contentsDB.getCCategories(companyCode, code);
    }
    getCCategoriesByUser(userID) {
        return this.contentsDB.getCCategoriesByUser(userID);
    }
    getCCategoriesByCCode(companyCode) {
        return this.contentsDB.getCCategoriesByCCode(companyCode);
    }
    existCompany(code) {
        return this.contentsDB.existCompanyCode(code);
    }
    getCampaignsByUser(userId) {
        return this.contentsDB.getCampaignsByUser(userId);
    }
    getCampaignById(uid) {
        return this.contentsDB.getCampaignById(uid);
    }
    pushCampaign(campignInfo) {
        return this.contentsDB.pushCampaign(campignInfo);
    }
    updateCampaign(campignInfo) {
        return this.contentsDB.updateCampaign(campignInfo);
    }
    removeCampaign(uid) {
        return this.contentsDB.deleteCampaign(uid);
    }
    getPortfolios(userId) {
        return this.contentsDB.getPortfolios(userId);
    }
    updateCampaignStatus(uid, activated) {
        return this.contentsDB.updateCampaignStatus(uid, activated);
    }
    updateCampaignTemplate(uid, ccode) {
        return this.contentsDB.updateCampaignTemplate(uid, ccode);
    }
    pushCampaignCompanyMapping(campaign, companyCodes) {
        return this.contentsDB.pushCampaignCompanyMapping(campaign, companyCodes);
    }
    getCampaignCompanyMappings(uid) {
        return this.contentsDB.getCampaignCompanyMappings(uid);
    }
    getCCategoriesByCode(code) {
        return this.contentsDB.getCCategoriesByCode(code);
    }
    removeCCategory(code) {
        return this.contentsDB.removeCCategory(code);
    }
    getCampaignByCompany(ccode) {
        return this.contentsDB.getCampaignByCompany(ccode);
    }
}
exports.ContentsService = ContentsService;
