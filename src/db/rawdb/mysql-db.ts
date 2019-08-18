import { IUserInfo, IUserProfile, ICategory, IQuestions } from '../dto/datadef'
import { DB } from './db';
import * as mysql from 'mysql';
import { Gernerators } from '../../generators'
import { createConnection } from 'net';

export class MySqlDB extends DB {

    private connection: mysql.Connection;
    private generators: Gernerators;

    constructor() {
        super();
        this.generators = Gernerators.bootstrap();
        if (MySqlDB.instance) {
            throw new Error('Error - use MySqlDB.getInstance()');
        }
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'bulk',
            password: 'jjang$194324',
            database: 'users',
            timezone: 'utc'
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
            this.connection.connect(error => {
                if (error) {
                    console.log(`my sql database initialize fail: ${error}`);
                    resolve(false);
                } else {
                    console.log(`my sql database initialize success`);
                    resolve(true);
                }
            });
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

    public readQuestions(categoryid: number): Promise<Array<IQuestions> | null> {
        return new Promise<Array<IQuestions> | null>(resolve => {
            const query = `SELECT * FROM questions WHERE category_id='${categoryid}' ORDER BY 'order' DESC`;
            console.log(`questions query is: ${query}`);
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

    public readValidAdminUser(email: string, password: string | undefined, code: number): Promise<IUserInfo | null> {
        return new Promise<IUserInfo | null>(resolve => {
            let query = `SELECT ui.email, ui.id, ui.photo, ui.user_name, ui.level, ci.name as cname `;
            query += `FROM user_info AS ui JOIN company_info AS ci ON ui.email='${email}' `;
            query += `AND ui.password='${password}' AND ui.code='${code}' AND ui.company_code=ci.code LIMIT 1`;
            console.log(`login query is: ${query}`);
            this.connection.query(query,
                (error, results, fields) => {
                    console.log(results);
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
                                    company_name: results[0].cname
                                };
                                console.log(`userInDB is ${JSON.stringify(userInDB)}`);
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

    public readCategories(): Promise<Array<ICategory> | null> {
        return new Promise<Array<ICategory> | null>(resolve => {
            const query = `SELECT * FROM categories WHERE child=0`;
            this.connection.query(query,
                (error, results, fields) => {
                    if (error) {
                        resolve(null);
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
                            console.log('not exist user profile');
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
                            console.log(`level user is ${results[0].level}`)
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

    public readValidUser(email: string, password: string): Promise<IUserInfo | null> {
        return new Promise<IUserInfo | null>(resolve => {
            let query = `SELECT ui.email, ui.id, ui.photo, ui.user_name, ui.level, ci.name as cname `;
            query += `FROM user_info AS ui JOIN company_info AS ci ON ui.email='${email}' `;
            query += `AND ui.password='${password}' AND ui.company_code=ci.code LIMIT 1`;
            console.log(`login query is: ${query}`);
            this.connection.query(query, (error, results, fields) => {
                console.log(results);
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
                                company_name: results[0].cname
                            };
                            console.log(`userInDB is ${JSON.stringify(userInDB)}`);
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
