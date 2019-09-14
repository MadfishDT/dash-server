import { DB, MySqlDB, IUserInfo, IUserProfile } from './rawdb/dbs';

export class UserDB {

    private static instance: UserDB;
    private db: DB;

    constructor() {
        if (UserDB.instance) {
            throw new Error('Error - use UserDB.getInstance()');
        }
        this.db = MySqlDB.getInstance();
    }

    public static getInstance(): UserDB {
        UserDB.instance = UserDB.instance || new UserDB();
        return UserDB.instance;
    }

    public getUser(id: string): Promise<IUserProfile | null> {
        return this.db.readUser(id);
    }
    public getValidUser(userinfo: IUserInfo): Promise<IUserInfo | null> {
        return this.db.readValidUser(userinfo.email, userinfo.password);
    }
    public getValidAdminUser(userinfo: IUserInfo, code: number): Promise<IUserInfo | null> {
        return this.db.readValidAdminUser(userinfo.email, userinfo.password, code);
    }
    public updateAgreement(userid: string): Promise<boolean> {
        return this.db.updateUserAgreement(userid);
    }
    public sessionDBOptions(): any {
        return this.db.getSessionDBOptions();
    }
}
