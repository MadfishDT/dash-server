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
const db_1 = require("./db");
const mysql = __importStar(require("mysql"));
const generators_1 = require("../../generators");
const uuidv1 = __importStar(require("uuid/v1"));
class MySqlDB extends db_1.DB {
    constructor() {
        super();
        this.generators = generators_1.Gernerators.bootstrap();
        if (MySqlDB.instance) {
            throw new Error('Error - use MySqlDB.getInstance()');
        }
        //console.log();
        const runningMode = process.argv[2];
        console.log('runing my sql prod mode');
        this.sessionDBOptions = {
            host: 'localhost',
            user: 'qesg',
            password: 'Qwer$1234',
            database: 'sessions',
        };
        this.connection = mysql.createPool({
            host: 'localhost',
            port: 3306,
            user: 'qesg',
            password: 'Qwer$1234',
            database: 'qesgs',
            connectionLimit: 220,
            waitForConnections: true,
            timezone: 'utc'
        });
        this.connection.on('error', (err) => {
            console.log('connection pool error');
        });
        this.connection.on('connection', (connection) => {
            console.log('connection create');
        });
        this.connection.on('enqueue', () => {
            console.log('connection enqueue');
        });
        this.initialize();
    }
    static getInstance() {
        MySqlDB.instance = MySqlDB.instance || new MySqlDB();
        return MySqlDB.instance;
    }
    getSessionDBOptions() {
        return this.sessionDBOptions;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }
    twoDigits(num) {
        if (0 <= num && num < 10) {
            return '0' + num.toString();
        }
        if (-10 < num && num < 0) {
            return '-0' + (-1 * num).toString();
        }
        return num.toString();
    }
    getSqlDateTime(time) {
        return time.getUTCFullYear() + '-' +
            this.twoDigits(1 + time.getUTCMonth()) + '-' +
            this.twoDigits(time.getUTCDate()) + ' ' +
            this.twoDigits(time.getUTCHours()) + ':' +
            this.twoDigits(time.getUTCMinutes()) + ':' +
            this.twoDigits(time.getUTCSeconds());
    }
    db_escape_string(text) {
        let result1 = text.replace(/([\\\n\r])/g, `\\$&`);
        return result1.replace("'", "''");
    }
    readCCategoriesByUser(userID) {
        return new Promise(resolve => {
            const query = `SELECT * FROM ccategories WHERE user_id='${userID}' ORDER BY date DESC`;
            this.connection.query(query, (error, results) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let categoriesDatas = [];
                        results.forEach((item) => {
                            const cdatas = {
                                id: item.id,
                                descs: item.descs,
                                data: item.data,
                                date: item.date,
                                code: item.code,
                                ccode: item.ccode,
                                name: item.name
                            };
                            categoriesDatas.push(cdatas);
                        });
                        resolve(categoriesDatas);
                    }
                    else {
                        resolve(null);
                    }
                }
            }));
        });
    }
    readCCategoriesByCode(code) {
        return new Promise(resolve => {
            const query = `SELECT * FROM ccategories WHERE code='${code}' ORDER BY date DESC LIMIT 1`;
            this.connection.query(query, (error, results) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        const cdatas = {
                            id: results[0].id,
                            descs: results[0].descs,
                            data: results[0].data,
                            date: results[0].date,
                            code: results[0].code,
                            ccode: results[0].ccode,
                            name: results[0].name
                        };
                        resolve(cdatas);
                    }
                    else {
                        resolve(null);
                    }
                }
            }));
        });
    }
    readCCategoriesByCCode(ccode) {
        return new Promise(resolve => {
            const query = `SELECT * FROM ccategories WHERE ccode='${ccode}' ORDER BY date DESC LIMIT 1`;
            this.connection.query(query, (error, results) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        const cdatas = {
                            id: results[0].id,
                            descs: results[0].descs,
                            data: results[0].data,
                            date: results[0].date,
                            code: results[0].code,
                            ccode: results[0].ccode
                        };
                        resolve(cdatas);
                    }
                    else {
                        resolve(null);
                    }
                }
            }));
        });
    }
    readCCategories(companyCode, code) {
        return new Promise(resolve => {
            const query = `SELECT * FROM ccategories WHERE company_code='${companyCode}' AND code='${code}' ORDER BY date DESC LIMITE 1`;
            this.connection.query(query, (error, results) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        const cdatas = {
                            id: results[0].id,
                            descs: results[0].descs,
                            data: results[0].data,
                            date: results[0].date,
                            code: results[0].code,
                            ccode: results[0].ccode
                        };
                        resolve(cdatas);
                    }
                    else {
                        resolve(null);
                    }
                }
            }));
        });
    }
    writeNCCategories(code, name, userID) {
        return new Promise((resolve) => {
            let commentQuery = `INSERT INTO ccategories(code, name, user_id) ` +
                `VALUES('${code}','${name}', '${userID}')`;
            this.connection.query(commentQuery, (commenterror) => {
                console.log(`writeAnswers query ${commenterror}`);
                if (commenterror) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    updateCCategoryName(code, name) {
        return new Promise((resolve) => {
            const query = `UPDATE ccategories SET name='${name}' WHERE code='${code}'`;
            this.connection.query(query, (commenterror) => {
                console.log(`writeAnswers query ${commenterror}`);
                if (commenterror) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    updateCCategories(code, jsonData, descs) {
        return new Promise((resolve) => {
            const query = `UPDATE ccategories SET data='${this.convItToTextCode(JSON.stringify(jsonData))}', descs='${descs}' WHERE code='${code}'`;
            console.log(query);
            this.connection.query(query, (commenterror) => {
                console.log(`writeAnswers query ${commenterror}`);
                if (commenterror) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    writeCCategories(ccode, code, jsonData, descs) {
        return new Promise((resolve) => {
            let commentQuery = `INSERT INTO ccategories(ccode, code, data, descs) ` +
                `VALUES('${ccode}','${code}','${this.convItToTextCode(JSON.stringify(jsonData))}', '${descs}')`;
            this.connection.query(commentQuery, (commenterror) => {
                console.log(`writeAnswers query ${commenterror}`);
                if (commenterror) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    writeAnswers(userid, categorid, questionid, jsonData) {
        return new Promise((resolve) => {
            let commentQuery = `INSERT INTO answers(uid, answers, user_id, category_id, question_id) ` +
                `VALUES('${categorid}-${userid}','${this.convItToTextCode(JSON.stringify(jsonData))}', ` +
                `'${userid}', '${categorid}', '${questionid}')`;
            this.connection.query(commentQuery, (commenterror) => {
                if (commenterror) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    //let query = `SELECT ui.*, ci.name as cname FROM user_info AS ui JOIN company_info AS ci WHERE ui.id='${id}' `
    //query += `AND ui.company_code=ci.code LIMIT 1`;
    readUserAnswers(categoryid) {
        return new Promise((resolve, reject) => {
            const query = `SELECT a1.*, ua.email as email, ua.user_name as user_name FROM answers AS a1 JOIN user_info AS ua `
                + `WHERE a1.id IN (SELECT max(id) as id FROM answers WHERE category_id='${categoryid}' GROUP BY user_id) AND ua.id=a1.user_id`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let resutsItems = new Array();
                        results.forEach((resultItem) => {
                            let answersDB = null;
                            answersDB = {
                                id: resultItem.id,
                                date: resultItem.date,
                                uid: resultItem.uid,
                                user_id: resultItem.user_id,
                                category_id: resultItem.category_id,
                                //answers: resultItem.answers,
                                question_id: resultItem.question_id,
                                email: resultItem.email,
                                user_name: resultItem.user_name
                            };
                            resutsItems.push(answersDB);
                        });
                        resolve(resutsItems);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    deleteCCategory(code) {
        return new Promise((resolve) => {
            const query = `DELETE FROM ccategories WHERE code='${code}'`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    deleteCampaign(uid) {
        return new Promise((resolve) => {
            const query = `DELETE FROM ccampaigns  WHERE uid='${uid}'`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    updateCampaign(campignInfo) {
        return new Promise((resolve) => {
            const query = `UPDATE ccampaigns SET name='${campignInfo.name}' WHERE uid='${campignInfo.uid}'`;
            console.log(query);
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    updateCampaignTemplate(uid, ccode) {
        return new Promise((resolve) => {
            const query = `UPDATE ccampaigns SET ccode='${ccode}' WHERE uid='${uid}'`;
            console.log(query);
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    updateCampaignStatus(uid, activated) {
        return new Promise((resolve) => {
            const query = `UPDATE ccampaigns SET activated='${activated ? 1 : 0}' WHERE uid='${uid}'`;
            console.log(query);
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    writeCampaign(campignInfo) {
        return new Promise((resolve) => {
            console.log('write campaign called');
            let cQuestionsQuery = `INSERT INTO ccampaigns(uid, user_id, name) ` +
                `VALUES('${campignInfo.uid}', '${campignInfo.user_id}', '${campignInfo.name}')`;
            console.log(cQuestionsQuery);
            this.connection.query(cQuestionsQuery, (error) => {
                if (error) {
                    console.log('fail writeCampaign');
                    resolve(false);
                }
                else {
                    console.log('success writeCampaign');
                    resolve(true);
                }
            });
        });
    }
    readCampaignsByUser(userId) {
        console.log('readCampaignsByUser');
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ccampaigns WHERE user_id='${userId}' ORDER BY date`;
            console.log(`${query}`);
            this.connection.query(query, (error, results) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let campaigns = [];
                        results.forEach((item) => {
                            let campItem = {
                                uid: item.uid,
                                user_id: item.user_id,
                                id: item.category_id,
                                name: item.name,
                                date: item.date,
                                ccode: item.ccode,
                                activated: item.activated === 1 ? true : false
                            };
                            console.log(`this is campaign : ${campItem.activated}`);
                            campaigns.push(campItem);
                        });
                        resolve(campaigns);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    readCampaignById(caId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ccampaigns WHERE uid='${caId}'`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let campItem = {
                            uid: results[0].uid,
                            user_id: results[0].user_id,
                            id: results[0].category_id,
                            name: results[0].name,
                            date: results[0].date,
                            ccode: results[0].ccode,
                            activated: results[0].activated
                        };
                        resolve(campItem);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    readAnswersById(aId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM answers WHERE id='${aId}'`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let answersDB = null;
                        answersDB = {
                            uid: results[0].uid,
                            user_id: results[0].user_id,
                            category_id: results[0].category_id,
                            answers: results[0].answers,
                            question_id: results[0].question_id,
                        };
                        resolve(answersDB);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    readAnswers(categoryid, userid) {
        return new Promise((resolve, reject) => {
            const query = `SELECT ass.*, cq.data as questions FROM answers AS ass JOIN cquestions AS cq WHERE ass.category_id='${categoryid}' `
                + `AND ass.user_id='${userid}' AND ass.question_id=cq.id ORDER BY ass.date DESC LIMIT 1`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let answersDB = null;
                        answersDB = {
                            uid: results[0].uid,
                            user_id: results[0].user_id,
                            category_id: results[0].category_id,
                            answers: results[0].answers,
                            question_id: results[0].question_id,
                            questions: results[0].questions
                        };
                        resolve(answersDB);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    updateAnswer(userid, categorid, jsonData) {
        return new Promise(resolve => resolve(true));
    }
    convItToTextCode(scriptCode) {
        let code = scriptCode;
        let fromAr = new Array(/\\/g, /'/g, /"/g, /\r\n/g, /[\r\n]/g, /\t/g, new RegExp('--' + '>', 'g'), new RegExp('<!' + '--', 'g'), /\//g), toAr = new Array('\\\\', '\\\'', '\\\"', '\\n', '\\n', '\\t', '--\'+\'>', '<!\'+\'--', '\\\/');
        for (let x = 0; x < fromAr.length; x++) {
            code = code.replace(fromAr[x], toAr[x]);
        }
        return code;
    }
    existCompanyCode(code) {
        return new Promise(resolve => {
            const query = `SELECT * FROM company_info WHERE code='${code}'`;
            this.connection.query(query, (error, results, fields) => {
                if (!error) {
                    if (results.length >= 1) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    readCompanysByCode(code) {
        return new Promise(resolve => {
            const query = `SELECT * FROM company_info WHERE code='${code}' LIMIT 1`;
            console.log(query);
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let compinfo;
                        compinfo = {
                            id: results[0].id,
                            code: results[0].code,
                            name: results[0].name,
                            desc: results[0].desc,
                        };
                        resolve(compinfo);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    readCompanys() {
        return new Promise(resolve => {
            const query = `SELECT * FROM company_info`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let questions = new Array();
                        results.forEach((item) => {
                            questions.push({
                                id: item.id,
                                code: item.code, name: item.name, desc: item.desc
                            });
                        });
                        if (questions.length > 0) {
                            resolve(questions);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    readQuestions(categoryid) {
        return new Promise(resolve => {
            const query = `SELECT * FROM questions WHERE category_id='${categoryid}' ORDER BY 'order' DESC`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let questions = new Array();
                        results.forEach((item) => {
                            questions.push({ data: item.data, order: item.order, type: item.type, id: item.id });
                        });
                        if (questions.length > 0) {
                            resolve(questions);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    readCQuestion(categoriId) {
        return new Promise(resolve => {
            const query = `SELECT * FROM cquestions WHERE category_id='${categoriId}' ORDER BY id DESC LIMIT 1`;
            this.connection.query(query, (error, results) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let cquestion;
                        cquestion = {
                            data: results[0].data,
                            id: results[0].id,
                            revision: results[0].revision
                        };
                        resolve(cquestion);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    readCQuestionRevision(categoriId, revison) {
        return new Promise(resolve => {
            const query = `SELECT * FROM cquestions WHERE category_id='${categoriId} AND revision=${revison}' ORDER BY 'revision' ASC`;
            this.connection.query(query, (error, results) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let cquestion;
                        cquestion = {
                            data: results[0].data,
                            id: results[0].id,
                            revision: results[0].revision
                        };
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    writeUser(userinfo) {
        return new Promise((resolve) => {
            //IUserInfo
            let guid = uuidv1.default();
            let cQuestionsQuery = `INSERT INTO user_info(id, email, password, user_name, company_name, company_code, part) ` +
                `VALUES('${guid}', '${userinfo.email}', '${userinfo.password}', '${userinfo.name}', '${userinfo.cname}', '${userinfo.ccode}', '${userinfo.part}')`;
            this.connection.query(cQuestionsQuery, (error) => {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    writeCQuestion(categoriId, jsonData) {
        return new Promise((resolve) => {
            let cQuestionsQuery = `INSERT INTO cquestions(category_id, data) ` +
                `VALUES('${categoriId}', '${this.convItToTextCode(JSON.stringify(jsonData))}')`;
            this.connection.query(cQuestionsQuery, (error) => {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    readValidAdminUser(email, password, code) {
        return new Promise(resolve => {
            let query = `SELECT ui.email, ui.id, ui.photo, ui.user_name, ui.level, ui.company_code, ui.agreement, ci.name as cname `;
            query += `FROM user_info AS ui JOIN company_info AS ci ON ui.email='${email}' `;
            query += `AND ui.password='${password}' AND ui.company_code=ci.code AND ui.code='${code}' LIMIT 1`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        if (results[0].level >= 1) {
                            let userInDB = null;
                            userInDB = {
                                email: results[0].email,
                                id: results[0].id,
                                password: '',
                                photo: results[0].photo,
                                user_name: results[0].user_name,
                                level: results[0].level,
                                company_name: results[0].cname,
                                agreement: results[0].agreement,
                                company_code: results[0].company_code
                            };
                            resolve(userInDB);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    readCategoriesChild(parentID) {
        const query = `SELECT * FROM categories WHERE child=1 AND parent_id=${parentID}`;
        return new Promise(resolve => {
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    return null;
                }
                else {
                    if (results && results.length > 0) {
                        let categories = new Array();
                        results.forEach((item) => {
                            categories.push({ id: item.id, name: item.name, descs: item.descs });
                        });
                        if (categories.length > 0) {
                            resolve(categories);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    readCategories(companyCode) {
        return new Promise(resolve => {
            const query = `SELECT * FROM categories WHERE child=0 && company_code = '${companyCode}' ORDER BY 'order' ASC`;
            this.connection.query(query, (error, results) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let categories = new Array();
                        for (let item of results) {
                            let children = yield this.readCategoriesChild(item.id);
                            categories.push({ id: item.id, name: item.name, descs: item.desc, children: children });
                        }
                        if (categories.length > 0) {
                            resolve(categories);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    else {
                        resolve(null);
                    }
                }
            }));
        });
    }
    readUser(id) {
        return new Promise(resolve => {
            let query = `SELECT ui.*, ci.name as cname FROM user_info AS ui JOIN company_info AS ci WHERE ui.id='${id}' `;
            query += `AND ui.company_code=ci.code LIMIT 1`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let userProfileInDB = null;
                        if (results[0].level <= 0) {
                            userProfileInDB = {
                                id: results[0].id,
                                email: results[0].email,
                                profile: results[0].profile,
                                photo: results[0].photo,
                                user_name: results[0].user_name,
                                first_name: results[0].firest_name,
                                last_name: results[0].last_name,
                                phone: results[0].phone,
                                address: results[0].address,
                                city: results[0].city,
                                country: results[0].country,
                                postal_code: results[0].postal_code,
                                about: results[0].about,
                                level: results[0].level,
                                company_name: results[0].cname,
                                company_code: results[0].company_code,
                                agreement: results[0].agreement
                            };
                            resolve(userProfileInDB);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    updateUserAgreement(uid) {
        return new Promise((resolve) => {
            const query = `UPDATE user_info SET agreement='1' WHERE id='${uid}'`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    readValidUserByEmail(email) {
        return new Promise(resolve => {
            let query = `SELECT ui.email, ui.id, ui.photo, ui.user_name, ui.level, ui.company_code, ui.agreement, ci.name as cname `;
            query += `FROM user_info AS ui JOIN company_info AS ci ON ui.email='${email}' `;
            query += `AND ui.company_code=ci.code LIMIT 1`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        if (results[0].level <= 0) {
                            let userInDB = null;
                            userInDB = {
                                email: results[0].email,
                                id: results[0].id,
                                password: '',
                                photo: results[0].photo,
                                user_name: results[0].user_name,
                                level: results[0].level,
                                company_name: results[0].cname,
                                agreement: results[0].agreement,
                                company_code: results[0].company_code
                            };
                            resolve(userInDB);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    readValidUser(email, password) {
        return new Promise(resolve => {
            let query = `SELECT ui.email, ui.id, ui.photo, ui.user_name, ui.level, ui.company_code, ui.agreement, ci.name as cname `;
            query += `FROM user_info AS ui JOIN company_info AS ci ON ui.email='${email}' `;
            query += `AND ui.password='${password}' AND ui.company_code=ci.code LIMIT 1`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        if (results[0].level <= 0) {
                            let userInDB = null;
                            userInDB = {
                                email: results[0].email,
                                id: results[0].id,
                                password: '',
                                photo: results[0].photo,
                                user_name: results[0].user_name,
                                level: results[0].level,
                                company_name: results[0].cname,
                                agreement: results[0].agreement,
                                company_code: results[0].company_code
                            };
                            resolve(userInDB);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    readPortfolios(userId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM cportfolio WHERE user_id='${userId}'`;
            this.connection.query(query, (error, results, fields) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let resultsItems = new Array();
                        let comCodes = [];
                        for (let result of results) {
                            let portInfo = null;
                            portInfo = {
                                pid: result.pid,
                                name: result.name,
                                companies: []
                            };
                            if (result.companies && result.companies.length > 0) {
                                comCodes = JSON.parse(result.companies);
                                console.log(comCodes);
                            }
                            if (comCodes) {
                                for (let code of comCodes) {
                                    const cInfo = yield this.readCompanysByCode(code);
                                    console.log(cInfo);
                                    if (cInfo) {
                                        portInfo.companies.push({
                                            name: cInfo.name,
                                            code: cInfo.code
                                        });
                                    }
                                }
                            }
                            resultsItems.push(portInfo);
                        }
                        ;
                        resolve(resultsItems);
                    }
                    else {
                        resolve(null);
                    }
                }
            }));
        });
    }
    updatePortfolios(portInfos) {
        return new Promise((resolve) => {
            const query = `UPDATE cportfolio SET name='${portInfos.name}' name='${portInfos.companies}' WHERE pid='${portInfos.pid}'`;
            console.log(query);
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    deleteCampaignCompanyMapping(uid) {
        return new Promise((resolve) => {
            const query = `DELETE FROM ccampaignmapping WHERE uid='${uid}'`;
            this.connection.query(query, (error) => {
                console.log(`writeAnswers query ${error}`);
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    insertCampaignCompanyMapping(campaign, companyCodes) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const removeResult = yield this.deleteCampaignCompanyMapping(campaign.uid);
            let insertsCommand = '';
            companyCodes.forEach((item, index) => {
                insertsCommand += `('${campaign.uid}' , '${item}')`;
                if (index < companyCodes.length - 1) {
                    insertsCommand += ',';
                }
            });
            let cMappingQuery = `INSERT INTO ccampaignmapping(uid, ccode) ` +
                `VALUES` + insertsCommand;
            console.log(cMappingQuery);
            this.connection.query(cMappingQuery, (commenterror) => {
                console.log(`cMappingQuery query ${commenterror}`);
                if (commenterror) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        }));
    }
    readCampaignByCompany(ccode) {
        return new Promise((resolve, reject) => {
            const query = `SELECT cc.* FROM ccampaigns cc LEFT JOIN ccampaignmapping cm ON (cc.uid=cm.uid) WHERE cm.ccode='${ccode}' AND activated='1'`;
            console.log(`${query}`);
            this.connection.query(query, (error, results) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let campaigns = [];
                        results.forEach((item) => {
                            let campItem = {
                                uid: item.uid,
                                user_id: item.user_id,
                                id: item.category_id,
                                name: item.name,
                                date: item.date,
                                ccode: item.ccode,
                                activated: item.activated === 1 ? true : false
                            };
                            console.log(`this is campaign : ${campItem.activated}`);
                            campaigns.push(campItem);
                        });
                        resolve(campaigns);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
    readCampaignCompanyMappings(uid) {
        return new Promise((resolve, reject) => {
            //const query = `SELECT * FROM cportfolio WHERE user_id='${userId}'`;
            const query = `SELECT * FROM ccampaignmapping WHERE uid='${uid}'`;
            this.connection.query(query, (error, results, fields) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        let portInfo = null;
                        portInfo = {
                            pid: '-1',
                            name: '-1',
                            companies: []
                        };
                        for (let item of results) {
                            const cInfo = yield this.readCompanysByCode(item.ccode);
                            console.log(cInfo);
                            if (cInfo) {
                                portInfo.companies.push({
                                    name: cInfo.name,
                                    code: cInfo.code
                                });
                            }
                            console.log(cInfo);
                        }
                        resolve(portInfo);
                    }
                    else {
                        resolve(null);
                    }
                }
            }));
        });
    }
    insertPortfolios(portInfos, userID) {
        return new Promise((resolve) => {
            let commentQuery = `INSERT INTO cportfolio(name, pid, compaies, user_id) ` +
                `VALUES('${portInfos.name}','${portInfos.pid}','${this.convItToTextCode(JSON.stringify(portInfos.companies))}', '${userID}')`;
            this.connection.query(commentQuery, (commenterror) => {
                console.log(`writeAnswers query ${commenterror}`);
                if (commenterror) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    deletePortfolios(portID) {
        return new Promise((resolve) => {
            const query = `DELETE FROM cportfolio WHERE pid='${portID}'`;
            this.connection.query(query, (error) => {
                console.log(`writeAnswers query ${error}`);
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
}
exports.MySqlDB = MySqlDB;
