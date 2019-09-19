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
            password: 'Jjang07',
            database: 'sessions',
        };
        this.connection = mysql.createPool({
            host: 'localhost',
            port: 3306,
            user: 'qesg',
            password: 'Jjang07',
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
    writeAnswers(userid, categorid, questionid, jsonData) {
        return new Promise((resolve) => {
            let commentQuery = `INSERT INTO answers(uid, answers, user_id, category_id, question_id) ` +
                `VALUES('${categorid}-${userid}','${this.convItToTextCode(JSON.stringify(jsonData))}', ` +
                `'${userid}', '${categorid}', '${questionid}')`;
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
    //let query = `SELECT ui.*, ci.name as cname FROM user_info AS ui JOIN company_info AS ci WHERE ui.id='${id}' `
    //query += `AND ui.company_code=ci.code LIMIT 1`;
    readUserAnswers(categoryid) {
        console.log('readAnswers');
        return new Promise((resolve, reject) => {
            const query = `SELECT a1.*, ua.email as email, ua.user_name as user_name FROM answers AS a1 JOIN user_info AS ua `
                + `WHERE a1.id IN (SELECT max(id) as id FROM answers WHERE category_id=${categoryid} GROUP BY user_id) AND ua.id=a1.user_id`;
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
                        console.log('not exist user');
                        resolve(null);
                    }
                }
            });
        });
    }
    readAnswersById(aId) {
        console.log('readAnswers');
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
                        console.log('not exist user');
                        resolve(null);
                    }
                }
            });
        });
    }
    readAnswers(categoryid, userid) {
        console.log('readAnswers');
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
                        console.log('not exist user');
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
                        console.log('not exist user profile');
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
                        console.log('not exist questions');
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
                        console.log('not exist cquestion profile');
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
                        console.log('not exist user profile');
                        resolve(null);
                    }
                }
            });
        });
    }
    writetCQuestion(categoriId, jsonData) {
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
                    console.log(error);
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
                            categories.push({ id: item.id, name: item.name, desc: item.desc });
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
                            categories.push({ id: item.id, name: item.name, desc: item.desc, children: children });
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
                        console.log('not exist user profile');
                        resolve(null);
                    }
                }
            });
        });
    }
    updateUserAgreement(uid) {
        console.log('update agreement');
        return new Promise((resolve) => {
            const query = `UPDATE user_info SET agreement='1' WHERE id='${uid}'`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    resolve(false);
                }
                else {
                    resolve(true);
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
                        console.log('not exist user');
                        resolve(null);
                    }
                }
            });
        });
    }
}
exports.MySqlDB = MySqlDB;
