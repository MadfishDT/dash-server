"use strict";
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
        /*  this.connection = mysql.createConnection({
              host: 'localhost',
              user: 'bulk',
              password: 'jjang$194324',
              database: 'users',
              timezone: 'utc'
          });*/
        this.connection = mysql.createConnection({
            host: '35.193.127.219',
            user: 'root',
            password: 'Jjang$194324',
            database: 'users',
            timezone: 'utc'
        });
        this.initialize();
    }
    static getInstance() {
        MySqlDB.instance = MySqlDB.instance || new MySqlDB();
        return MySqlDB.instance;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            this.connection.connect(error => {
                if (error) {
                    console.log(`my sql database initialize fail: ${error}`);
                    resolve(false);
                }
                else {
                    console.log(`my sql database initialize success`);
                    resolve(true);
                }
            });
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
    writeAnswersConfirm(userid, categorid, jsonData) {
        console.log(`writeAnswers ${userid} -- ${categorid} -- ${jsonData}`);
        return new Promise((resolve) => {
            let commentQuery = `INSERT INTO answers_confirm(uid, answers, user_id, category_id) ` +
                `VALUES('${categorid}-${userid}','${this.convItToTextCode(JSON.stringify(jsonData))}', ` +
                `'${userid}', '${categorid}')`;
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
    writeAnswers(userid, categorid, jsonData) {
        console.log(`writeAnswers ${userid} -- ${categorid} -- ${jsonData}`);
        return new Promise((resolve) => {
            let commentQuery = `INSERT INTO answers(uid, answers, user_id, category_id) ` +
                `VALUES('${categorid}-${userid}','${this.convItToTextCode(JSON.stringify(jsonData))}', ` +
                `'${userid}', '${categorid}')`;
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
    readAnswersConfirm(uid) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM answers_comfirm WHERE uid='${uid}' ORDER BY 'date' DESC LIMIT 1`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        if (results[0].level <= 0) {
                            let answersDB = null;
                            answersDB = {
                                uid: results[0].uid,
                                user_id: results[0].user_id,
                                category_id: results[0].category_id,
                                answers: results[0].answers
                            };
                            console.log(`answersDB is ${JSON.stringify(answersDB)}`);
                            resolve(answersDB);
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
    readAnswers(uid) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM answers WHERE uid='${uid}' ORDER BY 'date' DESC LIMIT 1`;
            this.connection.query(query, (error, results, fields) => {
                console.log(results);
                if (error) {
                    resolve(null);
                }
                else {
                    if (results && results.length > 0) {
                        if (results[0].level <= 0) {
                            let answersDB = null;
                            answersDB = {
                                uid: results[0].uid,
                                user_id: results[0].user_id,
                                category_id: results[0].category_id,
                                answers: results[0].answers
                            };
                            resolve(answersDB);
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
                        console.log('not exist user profile');
                        resolve(null);
                    }
                }
            });
        });
    }
    readValidAdminUser(email, password, code) {
        return new Promise(resolve => {
            let query = `SELECT ui.email, ui.id, ui.photo, ui.user_name, ui.level, ci.name as cname `;
            query += `FROM user_info AS ui JOIN company_info AS ci ON ui.email='${email}' `;
            query += `AND ui.password='${password}' AND ui.code='${code}' AND ui.company_code=ci.code LIMIT 1`;
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
                                company_name: results[0].cname
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
    readCategories() {
        return new Promise(resolve => {
            const query = `SELECT * FROM categories WHERE child=0`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
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
                        console.log('not exist user profile');
                        resolve(null);
                    }
                }
            });
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
                                company_code: results[0].company_code
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
    readValidUser(email, password) {
        return new Promise(resolve => {
            let query = `SELECT ui.email, ui.id, ui.photo, ui.user_name, ui.level, ci.name as cname `;
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
                                company_name: results[0].cname
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
