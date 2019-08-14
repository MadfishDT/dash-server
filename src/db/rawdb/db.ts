import { IUserInfo, IUserProfile, ICategory } from '../dto/datadef';

export abstract class DB {
    
    constructor() {
    }
    public abstract initialize() : Promise<boolean>;
    public abstract getValidUser(email: string, password: string | undefined): Promise< IUserInfo | null>;
    public abstract getUser(id: string): Promise< IUserProfile | null>;
    public abstract getCategories(): Promise< Array<ICategory> | null>;
    public abstract getValidAdminUser(email: string, password: string | undefined , code: number): Promise< IUserInfo | null>;
}
