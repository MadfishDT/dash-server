import { IUserInfo, IUserProfile, ICategory, IQuestions, IAnswers, ICompany, ICQuestions } from '../dto/datadef';

export abstract class DB {
    
    constructor() {
    }
    public abstract initialize() : Promise<boolean>;
    public abstract readValidUser(email: string, password: string | undefined): Promise< IUserInfo | null>;
    public abstract readUser(id: string): Promise< IUserProfile | null>;
    public abstract readCategories(companyCode: string): Promise< Array<ICategory> | null>;
    public abstract readQuestions(id: number): Promise< Array<IQuestions> | null>;
    
    //questions section
    public abstract readCQuestion(categoriId: number): Promise< ICQuestions | null >;
    public abstract readCQuestionRevision(categoriId: number, revison: number): Promise< ICQuestions | null >;
    public abstract writetCQuestion(categoriId: number, data: any): Promise< boolean >;

    public abstract readValidAdminUser(email: string, password: string | undefined , code: number): Promise< IUserInfo | null>;

    //read write ansers sections
    public abstract readAnswers(categoryid: number, userid: string): Promise<IAnswers | null>;
    public abstract writeAnswers(userid: string, categorid: number, questionid: number, jsonData: any): Promise<boolean>;

    public abstract updateAnswer(userid: string, categorid: number, jsonData: any): Promise<boolean>;
    public abstract updateUserAgreement(userid: string): Promise<boolean>;
    public abstract readCompanys(): Promise<ICompany[] | null>;
    public abstract getSessionDBOptions(): any;
}
