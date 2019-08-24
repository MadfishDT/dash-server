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
class ContentsService {
    static bootstrap() {
        return new ContentsService();
    }
    constructor() {
        this.generators = generators_1.Gernerators.bootstrap();
        this.categoriesSubject = new rx.Subject();
        this.contentsDB = contents_db_1.ContentsDB.getInstance();
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.contentsDB.getCategories();
            return result;
        });
    }
    getQuestions(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.contentsDB.getQuestions(id);
            return result;
        });
    }
    getAnswers(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.contentsDB.getAnswers(uid);
            return result;
        });
    }
    pushAnswersConfirm(userid, categoryid, answers) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.contentsDB.pushAnswersConfirm(userid, categoryid, answers);
            return result;
        });
    }
    pushAnswers(userid, categoryid, answers) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.contentsDB.pushAnswers(userid, categoryid, answers);
            return result;
        });
    }
}
exports.ContentsService = ContentsService;