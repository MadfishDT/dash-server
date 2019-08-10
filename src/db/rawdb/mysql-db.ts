import { IUserInfo, IUserProfile } from '../dto/datadef' 
import { DB } from './db';
import * as mysql from 'mysql';
import { Gernerators } from '../../generators'
import { createConnection } from 'net';

export class MySqlDB extends DB{
    
    private connection : mysql.Connection;
    private generators : Gernerators;

    constructor() {
        super();
        this.generators = Gernerators.bootstrap();
        if (MySqlDB.instance) {
            throw new Error('Error - use MySqlDB.getInstance()');
        }
        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'bulk',
            password : 'jjang$194324',
            database : 'users',
            timezone : 'utc'
        });
        this.initialize();
    }
    
    private static instance : MySqlDB;
   
    public static getInstance() : MySqlDB {
        MySqlDB.instance = MySqlDB.instance || new MySqlDB();
        return MySqlDB.instance;
    }
    
    public initialize() : Promise<boolean> {
        return new Promise<boolean>( (resolve, reject) => {
            this.connection.connect( error => {
                if(error) {
                    console.log(`my sql database initialize fail: ${error}`);
                    resolve(false);
                } else{
                    console.log(`my sql database initialize success`);
                    resolve(true);
                }
            });
        });
    }
    
    private twoDigits(num : number) : string {
        if(0 <= num && num < 10) {
            return '0' + num.toString();
        }
        if(-10 < num && num < 0){
            return '-0' + (-1*num).toString();
        } 
        return num.toString();
    }

    private getSqlDateTime(time : Date) : string {
        return time.getUTCFullYear() + '-' +
        this.twoDigits(1 + time.getUTCMonth()) + '-' +
        this.twoDigits(time.getUTCDate()) + ' ' +
        this.twoDigits(time.getUTCHours()) + ':' +
        this.twoDigits(time.getUTCMinutes()) + ':' +
        this.twoDigits(time.getUTCSeconds());
    }

    private db_escape_string(text : string) : string {
        let result1 = text.replace( /([\\\n\r])/g , `\\$&`);
        return result1.replace("'", "''");
    };

    public getUser(id: string) : Promise< IUserProfile | null> {
        return new Promise< IUserProfile | null>( resolve => {
            const query = `SELECT * FROM user_info WHERE id='${id}' LIMIT 1`;
            this.connection.query(query,
            (error, results, fields) => {
                if (error) {
                    resolve(null);
                } else {
                    if(results && results.length > 0) {
                        let userProfileInDB : IUserProfile | null= null;
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
                            about: results[0].about
                        };
                        resolve(userProfileInDB);
                    } else {
                        console.log('not exist user profile');
                        resolve(null);
                    }
                }
            });
        });
    }
    public getValidUser(email : string, password : string) : Promise< IUserInfo | null> {
        return new Promise< IUserInfo | null>( resolve => {
            const query = `SELECT * FROM user_info WHERE email='${email}' AND password='${password}' LIMIT 1`;
            console.log(`login query is: ${query}`);
            this.connection.query(query,
            (error, results, fields) => {
                console.log(results);
                if (error) {
                    resolve(null);
                } else {
                    if(results && results.length > 0) {
                        let userInDB : IUserInfo | null= null;
                        userInDB = {
                            email: results[0].email,
                            id: results[0].id,
                            password: '',
                            photo: results[0].photo,
                            user_name: results[0].user_name
                        };
                        resolve(userInDB);
                    } else {
                        console.log('not exist user');
                        resolve(null);
                    }
                }
            });
        });
    }
}
