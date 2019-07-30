import { IUserInfo } from '../dto/datadef' 
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
                        userInDB = {email: results[0].email, id: results[0].id, password: ''};
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
