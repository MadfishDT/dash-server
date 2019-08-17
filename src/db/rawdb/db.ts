import { IUserInfo, IUserProfile, ICategory, IQuestions } from '../dto/datadef';

export abstract class DB {
    
    constructor() {
    }
    public abstract initialize() : Promise<boolean>;
    public abstract readValidUser(email: string, password: string | undefined): Promise< IUserInfo | null>;
    public abstract readUser(id: string): Promise< IUserProfile | null>;
    public abstract readCategories(): Promise< Array<ICategory> | null>;
    public abstract readQuestions(id: number): Promise< Array<IQuestions> | null>;
    public abstract readValidAdminUser(email: string, password: string | undefined , code: number): Promise< IUserInfo | null>;
}
