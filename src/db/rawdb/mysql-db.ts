import { IUserInfo, IUserProfile, ICategory, ICCategory, IQuestions, IAnswers, ICompany, ICQuestions, IUserAnswers } from '../dto/datadef'
import { DB } from './db';
import * as mysql from 'mysql';
import { Gernerators } from '../../generators'
import * as uuidv1 from 'uuid/v1';
import { createConnection } from 'net';

export class MySqlDB extends DB {

    private connection: mysql.Pool;
    private generators: Gernerators;
    private sessionDBOptions: any;
    constructor() {
        super();
        this.generators = Gernerators.bootstrap();
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

    private static instance: MySqlDB;

    public static getInstance(): MySqlDB {
        MySqlDB.instance = MySqlDB.instance || new MySqlDB();
        return MySqlDB.instance;
    }

    public getSessionDBOptions(): any {
        return this.sessionDBOptions;
    }
    public initialize(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }

    private twoDigits(num: number): string {
        if (0 <= num && num < 10) {
            return '0' + num.toString();
        }
        if (-10 < num && num < 0) {
            return '-0' + (-1 * num).toString();
        }
        return num.toString();
    }

    private getSqlDateTime(time: Date): string {
        return time.getUTCFullYear() + '-' +
            this.twoDigits(1 + time.getUTCMonth()) + '-' +
            this.twoDigits(time.getUTCDate()) + ' ' +
            this.twoDigits(time.getUTCHours()) + ':' +
            this.twoDigits(time.getUTCMinutes()) + ':' +
            this.twoDigits(time.getUTCSeconds());
    }

    private db_escape_string(text: string): string {
        let result1 = text.replace(/([\\\n\r])/g, `\\$&`);
        return result1.replace("'", "''");
    }

    public readCCategoriesByCCode(ccode: string): Promise<ICCategory | null> {
        return new Promise<ICCategory | null>(resolve => {
            const query = `SELECT * FROM ccategories WHERE ccode='${ccode}' ORDER BY date DESC LIMIT 1`;
            console.log(query);
            this.connection.query(query, async (error, results) => {
                if (error) {
                    resolve(null);
                } else {
                    if (results && results.length > 0) {
                            const cdatas = {
                                id: results[0].id,
                                desc: results[0].desc,
                                data: results[0].data,
                                date: results[0].date,
                                code: results[0].code,
                                ccode: results[0].ccode
                            }
                            resolve(cdatas);
                        } else {
                            resolve(null);
                        }
                    }
                });
        });
    }

    public readCCategories(companyCode: string, code: string): Promise<ICCategory | null> {
        return new Promise<ICCategory | null>(resolve => {
            const query = `SELECT * FROM ccategories WHERE company_code='${companyCode}' AND code='${code}' ORDER BY date DESC LIMITE 1`;
            this.connection.query(query, async (error, results) => {
                if (error) {
                    resolve(null);
                } else {
                    if (results && results.length > 0) {
                            const cdatas = {
                                id: results[0].id,
                                desc: results[0].descs,
                                data: results[0].data,
                                date: results[0].date,
                                code: results[0].code,
                                ccode: results[0].ccode
                            }
                            resolve(cdatas);
                        } else {
                            resolve(null);
                        }
                    }
                });
        });
    }

    public writeCCategories(ccode: string, code: string, jsonData: any, descs: string): Promise<boolean> {
        
        return new Promise<boolean>((resolve) => {
            let commentQuery = `INSERT INTO ccategories(ccode, code, data, descs) ` +
                `VALUES('${ccode}','${code}','${this.convItToTextCode(JSON.stringify(jsonData))}', '${descs}')`;

            console.log(commentQuery);
            this.connection.query(commentQuery, (commenterror) => {
                console.log(`writeAnswers query ${commenterror}`);
                if (commenterror) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    public writeAnswers(userid: string, categorid: string, questionid: number, jsonData: any): Promise<boolean> {
   
        return new Promise<boolean>((resolve) => {
            let commentQuery = `INSERT INTO answers(uid, answers, user_id, category_id, question_id) ` +
                `VALUES('${categorid}-${userid}','${this.convItToTextCode(JSON.stringify(jsonData))}', ` +
                `'${userid}', '${categorid}', '${questionid}')`;
            this.connection.query(commentQuery, (commenterror) => {
                console.log(`writeAnswers query ${commenterror}`);
                if (commenterror) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    //let query = `SELECT ui.*, ci.name as cname FROM user_info AS ui JOIN company_info AS ci WHERE ui.id='${id}' `
    //query += `AND ui.company_code=ci.code LIMIT 1`;
    public readUserAnswers(categoryid: string): Promise<IUserAnswers[] | null> {
        console.log('readAnswers');
        return new Promise<IUserAnswers[] | null>((resolve, reject) => {
            
             const query = `SELECT a1.*, ua.email as email, ua.user_name as user_name FROM answers AS a1 JOIN user_info AS ua ` 
             +`WHERE a1.id IN (SELECT max(id) as id FROM answers WHERE category_id='${categoryid}' GROUP BY user_id) AND ua.id=a1.user_id`;
            console.log(`${query}`);
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                } else {
                    if (results && results.length > 0) {
                        let resutsItems = new Array<IUserAnswers>();
                        results.forEach( (resultItem: any) => {
                            let answersDB: IUserAnswers | null = null;
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
                    } else {
                        console.log('not exist user');
                        resolve(null);
                    }
                }
            });
        });
    }

    public readAnswersById(aId: number): Promise<IAnswers | null> {
        console.log('readAnswers');
        return new Promise<IAnswers | null>((resolve, reject) => {
            const query = `SELECT * FROM answers WHERE id='${aId}'`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                } else {
                    if (results && results.length > 0) {
                        let answersDB: IAnswers | null = null;
                        answersDB = {
                            uid: results[0].uid,
                            user_id: results[0].user_id,
                            category_id: results[0].category_id,
                            answers: results[0].answers,
                            question_id: results[0].question_id,
                        };
                        resolve(answersDB);
                    } else {
                        console.log('not exist user');
                        resolve(null);
                    }
                }
            });
        });
    }

    public readAnswers(categoryid: number, userid: string): Promise<IAnswers | null> {
        console.log('readAnswers');
        return new Promise<IAnswers | null>((resolve, reject) => {
            const query = `SELECT ass.*, cq.data as questions FROM answers AS ass JOIN cquestions AS cq WHERE ass.category_id='${categoryid}' `
            +`AND ass.user_id='${userid}' AND ass.question_id=cq.id ORDER BY ass.date DESC LIMIT 1`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                } else {
                    if (results && results.length > 0) {
                        let answersDB: IAnswers | null = null;
                        answersDB = {
                            uid: results[0].uid,
                            user_id: results[0].user_id,
                            category_id: results[0].category_id,
                            answers: results[0].answers,
                            question_id: results[0].question_id,
                            questions: results[0].questions
                        };
                        resolve(answersDB);
                    } else {
                        console.log('not exist user');
                        resolve(null);
                    }
                }
            });
        });
    }

    public updateAnswer(userid: string, categorid: number, jsonData: any): Promise<boolean> {
        return new Promise<boolean>(resolve => resolve(true));
    }

    private convItToTextCode(scriptCode: string): string {

        let code = scriptCode;
        let fromAr = new Array(/\\/g, /'/g, /"/g, /\r\n/g, /[\r\n]/g, /\t/g, new RegExp('--' + '>', 'g'), new RegExp('<!' + '--', 'g'), /\//g), toAr = new Array('\\\\', '\\\'', '\\\"', '\\n', '\\n', '\\t', '--\'+\'>', '<!\'+\'--', '\\\/');
        for (let x = 0; x < fromAr.length; x++) {
            code = code.replace(fromAr[x], toAr[x]);
        }
        return code;
    }
    public existCompanyCode(code: string): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            const query = `SELECT * FROM company_info WHERE code='${code}'`;
            console.log(query);
            this.connection.query(query,
                (error, results, fields) => {
                    if (!error) {
                        if(results.length >= 1) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    } else {
                        resolve(false);
                    }
                });
        });
    }
    public readCompanys(): Promise<ICompany[] | null> {
        return new Promise<Array<ICompany> | null>(resolve => {
            const query = `SELECT * FROM company_info`;
            this.connection.query(query,
                (error, results, fields) => {
                    if (error) {
                        resolve(null);
                    } else {
                        if (results && results.length > 0) {
                            let questions = new Array<ICompany>();
                            results.forEach((item: any) => {
                                questions.push({
                                    id: item.id,
                                    code: item.code, name: item.name, desc: item.desc
                                });
                            });
                            if (questions.length > 0) {
                                resolve(questions);
                            } else {
                                resolve(null);
                            }
                        } else {
                            console.log('not exist user profile');
                            resolve(null);
                        }
                    }
                });
        });
    }

    public readQuestions(categoryid: string): Promise<Array<IQuestions> | null> {
        return new Promise<Array<IQuestions> | null>(resolve => {
            const query = `SELECT * FROM questions WHERE category_id='${categoryid}' ORDER BY 'order' DESC`;
            this.connection.query(query,
                (error, results, fields) => {
                    if (error) {
                        resolve(null);
                    } else {
                        if (results && results.length > 0) {
                            let questions = new Array<IQuestions>();
                            results.forEach((item: any) => {
                                questions.push({ data: item.data, order: item.order, type: item.type, id: item.id });
                            });
                            if (questions.length > 0) {
                                resolve(questions);
                            } else {
                                resolve(null);
                            }
                        } else {
                            console.log('not exist questions');
                            resolve(null);
                        }
                    }
                });
        });
    }

    public readCQuestion(categoriId: string): Promise<ICQuestions | null> {
        return new Promise<ICQuestions | null>(resolve => {
            const query = `SELECT * FROM cquestions WHERE category_id='${categoriId}' ORDER BY id DESC LIMIT 1`;
            this.connection.query(query,
                (error, results) => {
                    if (error) {
                        resolve(null);
                    } else {
                        if (results && results.length > 0) {
                            let cquestion: ICQuestions;
                            cquestion = {
                                data: results[0].data,
                                id: results[0].id,
                                revision: results[0].revision
                            }
                            resolve(cquestion);
                        } else {
                            console.log('not exist cquestion profile');
                            resolve(null);
                        }
                    }
                });
        });
    }

    public readCQuestionRevision(categoriId: number, revison: number): Promise<ICQuestions | null> {
        return new Promise<ICQuestions | null>(resolve => {
            const query = `SELECT * FROM cquestions WHERE category_id='${categoriId} AND revision=${revison}' ORDER BY 'revision' ASC`;
            this.connection.query(query,
                (error, results) => {
                    if (error) {
                        resolve(null);
                    } else {
                        if (results && results.length > 0) {
                            let cquestion: ICQuestions;
                            cquestion = {
                                data: results[0].data,
                                id: results[0].id,
                                revision: results[0].revision
                            }
                        } else {
                            console.log('not exist user profile');
                            resolve(null);
                        }
                    }
                });
        });
    }
    public writeUser(userinfo: any): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            //IUserInfo
            let guid = uuidv1.default();
            let cQuestionsQuery = `INSERT INTO user_info(id, email, password, user_name, company_name, company_code, part) ` +
                `VALUES('${guid}', '${userinfo.email}', '${userinfo.password}', '${userinfo.name}', '${userinfo.cname}', '${userinfo.ccode}', '${userinfo.part}')`;
            console.log(`${cQuestionsQuery}`);
            this.connection.query(cQuestionsQuery, (error) => {
                if (error) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }
    public writeCQuestion(categoriId: string, jsonData: any): Promise<boolean> {
        return new Promise<boolean>((resolve) => {

            let cQuestionsQuery = `INSERT INTO cquestions(category_id, data) ` +
                `VALUES('${categoriId}', '${this.convItToTextCode(JSON.stringify(jsonData))}')`
            this.connection.query(cQuestionsQuery, (error) => {
                if (error) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    public readValidAdminUser(email: string, password: string | undefined, code: number): Promise<IUserInfo | null> {
        return new Promise<IUserInfo | null>(resolve => {
            let query = `SELECT ui.email, ui.id, ui.photo, ui.user_name, ui.level, ui.company_code, ui.agreement, ci.name as cname `;
            query += `FROM user_info AS ui JOIN company_info AS ci ON ui.email='${email}' `;
            query += `AND ui.password='${password}' AND ui.company_code=ci.code AND ui.code='${code}' LIMIT 1`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    resolve(null);
                } else {
                    if (results && results.length > 0) {
                        if (results[0].level >= 1) {
                            let userInDB: IUserInfo | null = null;
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
                        } else {
                            resolve(null);
                        }
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    public readCategoriesChild(parentID: number): Promise<Array<ICategory> | null> {

        const query = `SELECT * FROM categories WHERE child=1 AND parent_id=${parentID}`;

        return new Promise(resolve => {
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    return null;
                } else {
                    if (results && results.length > 0) {
                        let categories = new Array<ICategory>();
                        results.forEach((item: any) => {
                            categories.push({ id: item.id, name: item.name, desc: item.desc });
                        });
                        if (categories.length > 0) {
                            resolve(categories);
                        } else {
                            resolve(null);
                        }
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    public readCategories(companyCode: string): Promise<Array<ICategory> | null> {
        return new Promise<Array<ICategory> | null>(resolve => {
            const query = `SELECT * FROM categories WHERE child=0 && company_code = '${companyCode}' ORDER BY 'order' ASC`;
            this.connection.query(query,
                async (error, results) => {
                    if (error) {
                        resolve(null);
                    } else {
                        if (results && results.length > 0) {
                            let categories = new Array<ICategory>();
                            for (let item of results) {
                                let children = await this.readCategoriesChild(item.id);
                                categories.push({ id: item.id, name: item.name, desc: item.desc, children: children });
                            }
                            if (categories.length > 0) {
                                resolve(categories);
                            } else {
                                resolve(null);
                            }
                        } else {
                            resolve(null);
                        }
                    }
                });
        });
    }

    public readUser(id: string): Promise<IUserProfile | null> {
        return new Promise<IUserProfile | null>(resolve => {
            let query = `SELECT ui.*, ci.name as cname FROM user_info AS ui JOIN company_info AS ci WHERE ui.id='${id}' `
            query += `AND ui.company_code=ci.code LIMIT 1`;
            this.connection.query(query,
                (error, results, fields) => {
                    if (error) {
                        resolve(null);
                    } else {
                        if (results && results.length > 0) {
                            let userProfileInDB: IUserProfile | null = null;
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
                            } else {
                                resolve(null);
                            }
                        } else {
                            console.log('not exist user profile');
                            resolve(null);
                        }
                    }
                });
        });
    }

    public updateUserAgreement(uid: string): Promise<boolean> {
        console.log('update agreement');
        return new Promise<boolean>((resolve) => {
            const query = `UPDATE user_info SET agreement='1' WHERE id='${uid}'`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        })
    }

    public readValidUserByEmail(email: string): Promise<IUserInfo | null> {
        return new Promise<IUserInfo | null>(resolve => {
            let query = `SELECT ui.email, ui.id, ui.photo, ui.user_name, ui.level, ui.company_code, ui.agreement, ci.name as cname `;
            query += `FROM user_info AS ui JOIN company_info AS ci ON ui.email='${email}' `;
            query += `AND ui.company_code=ci.code LIMIT 1`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                } else {
                    if (results && results.length > 0) {
                        if (results[0].level <= 0) {
                            let userInDB: IUserInfo | null = null;
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
                        } else {
                            resolve(null);
                        }
                    } else {
                        console.log('not exist user');
                        resolve(null);
                    }
                }
            });
        });
    }
    public readValidUser(email: string, password: string): Promise<IUserInfo | null> {
        return new Promise<IUserInfo | null>(resolve => {
            let query = `SELECT ui.email, ui.id, ui.photo, ui.user_name, ui.level, ui.company_code, ui.agreement, ci.name as cname `;
            query += `FROM user_info AS ui JOIN company_info AS ci ON ui.email='${email}' `;
            query += `AND ui.password='${password}' AND ui.company_code=ci.code LIMIT 1`;
            this.connection.query(query, (error, results, fields) => {
                if (error) {
                    resolve(null);
                } else {
                    if (results && results.length > 0) {
                        if (results[0].level <= 0) {
                            let userInDB: IUserInfo | null = null;
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
                        } else {
                            resolve(null);
                        }
                    } else {
                        console.log('not exist user');
                        resolve(null);
                    }
                }
            });
        });
    }
}
