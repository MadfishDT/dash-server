import { DB, MySqlDB, IUserInfo } from './rawdb/dbs';

export class UserDB {
    
    private static instance : UserDB;
    private db : DB;

    constructor() {
        if (UserDB.instance) {
            throw new Error('Error - use UserDB.getInstance()');
        }
        this.db = MySqlDB.getInstance();
    }

    public static getInstance() : UserDB {
        UserDB.instance = UserDB.instance || new UserDB();
        return UserDB.instance;
    }

    public queryUser(uncertainUerInfo: IUserInfo) : Promise<IUserInfo | null> {
        return this.db.getValidUser(uncertainUerInfo.email, uncertainUerInfo.password);
    }
}
