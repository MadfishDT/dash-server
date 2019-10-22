import { IUserInfo, IUserProfile, ICategory, ICCampaign, ICCategory, IQuestions, IAnswers, ICompany, ICQuestions, IUserAnswers } from '../dto/datadef';

export abstract class DB {
    
    constructor() {
    }
    public abstract initialize() : Promise<boolean>;
    public abstract readValidUser(email: string, password: string | undefined): Promise< IUserInfo | null>;
    public abstract readUser(id: string): Promise< IUserProfile | null>;
    public abstract readValidUserByEmail(email: string): Promise< IUserInfo | null>;
    
    public abstract readCategories(companyCode: string): Promise< Array<ICategory> | null>;
    public abstract readQuestions(id: string): Promise< Array<IQuestions> | null>;
    
    //questions section
    public abstract readCQuestion(categoriId: string): Promise< ICQuestions | null >;
    public abstract readCQuestionRevision(categoriId: number, revison: number): Promise< ICQuestions | null >;
    public abstract writeCQuestion(categoriId: string, data: any): Promise< boolean >;

    public abstract readValidAdminUser(email: string, password: string | undefined , code: number): Promise< IUserInfo | null>;

    //read write ansers sections
    public abstract readAnswers(categoryid: number, userid: string): Promise<IAnswers | null>;
    public abstract readAnswersById(answersById: number): Promise<IAnswers | null>;

    public abstract readUserAnswers(categoryid: string): Promise<IUserAnswers[] | null>;
    
    public abstract writeAnswers(userid: string, categorid: string, questionid: number, jsonData: any): Promise<boolean>;

    public abstract updateAnswer(userid: string, categorid: number, jsonData: any): Promise<boolean>;
    public abstract updateUserAgreement(userid: string): Promise<boolean>;
    public abstract readCompanys(): Promise<ICompany[] | null>;
    public abstract getSessionDBOptions(): any;

    public abstract writeCCategories(ccode: string, code: string, jsonData: any, desc: string): Promise<boolean>;
    public abstract readCCategories(companyCode: string, code: string): Promise<ICCategory | null>;
    public abstract readCCategoriesByCCode(companyCode: string): Promise<ICCategory | null>;
    public abstract writeUser(user: any): Promise<boolean>;

    public abstract existCompanyCode(code: string): Promise<boolean>;

    public abstract readCampaignsByUser(userId: string): Promise<ICCampaign[] | null>;
    public abstract readCampaignById(udi: string): Promise<ICCampaign | null>;
    public abstract writeCampaign(campignInfo: any): Promise<boolean>;
    public abstract updateCampaign(campignInfo: any): Promise<boolean>;
    public abstract deleteCampaign(uid: string): Promise<boolean>;
}
