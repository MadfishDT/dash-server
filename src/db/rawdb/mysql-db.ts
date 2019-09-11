import { IUserInfo, IUserProfile, ICategory, IQuestions, IAnswers, ICompany, ICQuestions } from '../dto/datadef'
import { DB } from './db';
import * as mysql from 'mysql';
import { Gernerators } from '../../generators'
import { createConnection } from 'net';

export class MySqlDB extends DB {

    private connection: mysql.Pool;
    private generators: Gernerators;

    constructor() {
        super();
        this.generators = Gernerators.bootstrap();
        if (MySqlDB.instance) {
            throw new Error('Error - use MySqlDB.getInstance()');
        }
        //console.log();
        const runningMode = process.argv[2];

        if(runningMode === 'dev') {
            this.connection = mysql.createPool({
                host: 'localhost',
                port : 3306,
                user: 'bulk',
                password: 'jjang$194324',
                database: 'users',
                connectionLimit:10,
                waitForConnections: true,
                timezone: 'utc'
            });
        } else {
            console.log('runing my sql prod mode');
            this.connection = mysql.createPool({
                host: '35.193.127.219',
                port : 3306,
                user: 'root',
                password: 'Jjang$194324',
                database: 'users',
                connectionLimit:220,
                waitForConnections: true,
                timezone: 'utc'
            });
        }

        this.connection.on('error', (err) => {
            console.log('connection pool error');
        });

        this.connection.on('connection',  (connection) => {
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

    public initialize(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
         /*   this.connection.connect(error => {
                if (error) {
                    console.log(`my sql database initialize fail: ${error}`);
                    resolve(false);
                } else {
                    console.log(`my sql database initialize success`);
                    resolve(true);
                }
            });*/
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
    public writeAnswersConfirm(userid: string, categorid: number, jsonData: any): Promise<boolean> {
        console.log(`writeAnswers ${userid} -- ${categorid} -- ${jsonData}`)
        return new Promise<boolean>( (resolve) => {
            let commentQuery = `INSERT INTO answers_confirm(uid, answers, user_id, category_id) `+
            `VALUES('${categorid}-${userid}','${this.convItToTextCode(JSON.stringify(jsonData))}', ` + 
            `'${userid}', '${categorid}')`;
            this.connection.query(commentQuery, (commenterror) => {
                console.log(`writeAnswers query ${commenterror}`);
                if(commenterror) {
                    resolve(false);
                } else {
                    resolve(true);
                }
           });
        });
    }

    public writeAnswers(userid: string, categorid: number, jsonData: any): Promise<boolean> {
        console.log(`writeAnswers ${userid} -- ${categorid} -- ${jsonData}`)
        return new Promise<boolean>( (resolve) => {
            let commentQuery = `INSERT INTO answers(uid, answers, user_id, category_id) `+
            `VALUES('${categorid}-${userid}','${this.convItToTextCode(JSON.stringify(jsonData))}', ` + 
            `'${userid}', '${categorid}')`;
            this.connection.query(commentQuery, (commenterror) => {
                console.log(`writeAnswers query ${commenterror}`);
                if(commenterror) {
                    resolve(false);
                } else {
                    resolve(true);
                }
           });
        });
    }

    public readAnswersConfirm(uid: string): Promise<IAnswers | null> {
        return new Promise<IAnswers | null>( (resolve, reject) => {
            const query = `SELECT * FROM answers_comfirm WHERE uid='${uid}' ORDER BY 'date' DESC LIMIT 1`;
            this.connection.query(query,(error, results, fields) =>{
                if (error) {
                    resolve(null);
                } else {
                    if (results && results.length > 0) {
                        if (results[0].level <= 0) {
                            let answersDB: IAnswers | null = null;
                            answersDB = {
                                uid: results[0].uid,
                                user_id: results[0].user_id,
                                category_id: results[0].category_id,
                                answers: results[0].answers
                            };
                            console.log(`answersDB is ${JSON.stringify(answersDB)}`);
                            resolve(answersDB);
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

    public readAnswers(uid: string): Promise<IAnswers | null> {
        return new Promise<IAnswers | null>( (resolve, reject) => {
            const query = `SELECT * FROM answers WHERE uid='${uid}' ORDER BY 'date' DESC LIMIT 1`;
            this.connection.query(query,(error, results, fields) =>{
                console.log(results);
                if (error) {
                    resolve(null);
                } else {
                    if (results && results.length > 0) {
                        if (results[0].level <= 0) {
                            let answersDB: IAnswers | null = null;
                            answersDB = {
                                uid: results[0].uid,
                                user_id: results[0].user_id,
                                category_id: results[0].category_id,
                                answers: results[0].answers
                            };
                            resolve(answersDB);
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

    public updateAnswer(userid: string, categorid: number, jsonData: any): Promise<boolean> {
        return new Promise<boolean>( resolve => resolve(true));
    }

    private convItToTextCode(scriptCode: string): string {
       
        let code = scriptCode;
        let fromAr = new Array(/\\/g,/'/g,/"/g,/\r\n/g,/[\r\n]/g,/\t/g,new RegExp('--'+'>','g'),new RegExp('<!'+'--','g'),/\//g), toAr = new Array('\\\\','\\\'','\\\"','\\n','\\n','\\t','--\'+\'>','<!\'+\'--','\\\/');
        for( let x = 0; x < fromAr.length; x++ ) {
            code = code.replace(fromAr[x],toAr[x]);
        }
        return code;
    }
    public readCompanys(): Promise< ICompany[] | null > {
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
                                questions.push({ id: item.id,
                                     code: item.code, name: item.name, desc: item.desc });
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
    public readQuestions(categoryid: number): Promise<Array<IQuestions> | null> {
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
                            console.log('not exist user profile');
                            resolve(null);
                        }
                    }
                });
        });
    }

    public readCQuestion(categoriId: number): Promise< ICQuestions | null> {
        return new Promise< ICQuestions | null>(resolve => {
            const query = `SELECT * FROM cquestions WHERE category_id='${categoriId}' ORDER BY 'revision' ASC`;
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
                                revision: results[0].revision}                       
                        } else {
                            console.log('not exist user profile');
                            resolve(null);
                        }
                    }
                });
        });
    }

    public readCQuestionRevision(categoriId: number, revison: number): Promise< ICQuestions | null >{
        return new Promise< ICQuestions | null>(resolve => {
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
                                revision: results[0].revision}                       
                        } else {
                            console.log('not exist user profile');
                            resolve(null);
                        }
                    }
                });
        });
    }

    public writetCQuestion(categoriId: number, companyid: number, jsonData: number): Promise< boolean >{
        console.log(`CQuestions ${categoriId}-${companyid}`);
        return new Promise<boolean>( (resolve) => {
            
            let cQuestionsQuery = `INSERT INTO cquestion(category_id, company_id, data) `+
            `VALUES('${categoriId}', '${companyid}', '${this.convItToTextCode(JSON.stringify(jsonData))}'`

            this.connection.query(cQuestionsQuery, (error) => {
                console.log(`writeAnswers query ${error}`);
                if(error) {
                    resolve(false);
                } else {
                    resolve(true);
                }
           });
        });
    }
    
    public readValidAdminUser(email: string, password: string | undefined, code: number): Promise<IUserInfo | null> {
        console.log('admin user query start');
        return new Promise<IUserInfo | null>(resolve => {
            let query = `SELECT ui.email, ui.id, ui.photo, ui.user_name, ui.level, ui.agreement, ci.name as cname `;
            query += `FROM user_info AS ui JOIN company_info AS ci ON ui.email='${email}' `;
            query += `AND ui.password='${password}' AND ui.company_code=ci.code AND ui.code='${code}' LIMIT 1`;
            console.log(`readValidAdminUser: ${query}`);
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
                                agreement: results[0].agreement
                            };
                            console.log(`admin login success ${results[0].photo}`);
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
    public readCategoriesChild(parentID: number): Promise<Array<ICategory> | null> {

        const query = `SELECT * FROM categories WHERE child=1 AND parent_id=${parentID}`;
           
        return new Promise( resolve => {
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
    public readCategories(): Promise<Array<ICategory> | null> {
        return new Promise<Array<ICategory> | null>(resolve => {
            const query = `SELECT * FROM categories WHERE child=0`;
            this.connection.query(query,
                async (error, results) => {
                    if (error) {
                        resolve(null);
                    } else {
                        if (results && results.length > 0) {
                            let categories = new Array<ICategory>();
                            for( let item of results) {
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
            console.log(`update agreement query is ${query}`);
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

    public readValidUser(email: string, password: string): Promise<IUserInfo | null> {
        return new Promise<IUserInfo | null>(resolve => {
            let query = `SELECT ui.email, ui.id, ui.photo, ui.user_name, ui.level, ui.agreement, ci.name as cname `;
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
                                agreement: results[0].agreement
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
