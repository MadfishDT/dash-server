import { IUserInfo, IUserProfile, ICategory, IQuestions, IAnswers, ICompany, ICQuestions } from '../dto/datadef';

export abstract class DB {
    
    constructor() {
    }
    public abstract initialize() : Promise<boolean>;
    public abstract readValidUser(email: string, password: string | undefined): Promise< IUserInfo | null>;
    public abstract readUser(id: string): Promise< IUserProfile | null>;
    public abstract readCategories(): Promise< Array<ICategory> | null>;
    public abstract readQuestions(id: number): Promise< Array<IQuestions> | null>;
    
    public abstract readCQuestion(categoriId: number): Promise< ICQuestions | null >;
    public abstract readCQuestionRevision(categoriId: number, revison: number): Promise< ICQuestions | null >;
    public abstract writetCQuestion(categoriId: number, companyid: number, data: number): Promise< boolean >;

    public abstract readValidAdminUser(email: string, password: string | undefined , code: number): Promise< IUserInfo | null>;
    public abstract readAnswersConfirm(uid: string): Promise<IAnswers | null>;
    public abstract writeAnswersConfirm(userid: string, categorid: number, jsonData: any): Promise<boolean>;
    public abstract readAnswers(uid: string): Promise<IAnswers | null>;
    public abstract writeAnswers(userid: string, categorid: number, jsonData: any): Promise<boolean>;
    public abstract updateAnswer(userid: string, categorid: number, jsonData: any): Promise<boolean>;
    public abstract updateUserAgreement(userid: string): Promise<boolean>;
    public abstract readCompanys(): Promise<ICompany[] | null>;
}
