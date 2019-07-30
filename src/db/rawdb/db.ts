import { IUserInfo } from '../dto/datadef';

export abstract class DB {
    
    constructor() {
    }
    public abstract initialize() : Promise<boolean>;
    public abstract getValidUser(userID : string, password : string) : Promise< IUserInfo | null>;
}
