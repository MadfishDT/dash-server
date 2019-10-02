import { DB, MySqlDB, ICategory, IQuestions, ICompany, ICQuestions, IUserAnswers, ICCategory } from './rawdb/dbs';
import { IAnswers } from './dto/datadef';

export class ContentsDB {
    
    private static instance : ContentsDB;
    private db : DB;

    constructor() {
        if (ContentsDB.instance) {
            throw new Error('Error - use UserDB.getInstance()');
        }
        this.db = MySqlDB.getInstance();
    }

    public static getInstance(): ContentsDB {
        ContentsDB.instance = ContentsDB.instance || new ContentsDB();
        return ContentsDB.instance;
    }

    public getCategories(companyCode: string): Promise<ICategory[] | null> {
        return this.db.readCategories(companyCode);
    }

    public getQuestions(id: string): Promise< Array<IQuestions> | null > {
        return this.db.readQuestions(id);
    }

    public getAnswersById(answerId: number): Promise< IAnswers | null > {
        return this.db.readAnswersById(answerId);
    }

    public getAnswers(categoryid: number, userid: string): Promise< IAnswers | null > {
        return this.db.readAnswers(categoryid, userid);
    }

    public getUserAnswers(categoryid: number): Promise< IUserAnswers[] | null > {
        return this.db.readUserAnswers(categoryid);
    }

    public pushAnswers(userid: string, categorid: number, questionsid: number, jsonData: any): Promise<boolean> {
        return this.db.writeAnswers(userid, categorid, questionsid, jsonData);
    }

    public getCompanys(): Promise<ICompany[] | null> {
        return this.db.readCompanys();
    }
    
    public getCQuestion(id: string): Promise< ICQuestions | null > {
        return this.db.readCQuestion(id);
    }

    public getCQuestionRevision(id: number, revision: number): Promise< ICQuestions | null > {
        return this.db.readCQuestionRevision(id, revision);
    }

    public pushCQuestions(categorid: string, data: any): Promise<boolean> {
        return this.db.writeCQuestion(categorid, data);
    }

    public pushCCategories(ccode: string, code: string, data: any, desc: string): Promise<boolean> {
        return this.db.writeCCategories(ccode, code, data, desc);
    }

    public getCCategories(companyCode: string, code: string): Promise<ICCategory | null>  {
        return this.db.readCCategories(companyCode, code);
    }
    public getCCategoriesByCCode(companyCode: string): Promise<ICCategory | null>  {
        return this.db.readCCategoriesByCCode(companyCode);
    }
    public existCompanyCode(code: string): Promise<boolean> {
        return this.db.existCompanyCode(code);
    }
}
