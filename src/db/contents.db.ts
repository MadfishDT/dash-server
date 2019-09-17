import { DB, MySqlDB, ICategory, IQuestions, ICompany, ICQuestions, IUserAnswers } from './rawdb/dbs';
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

    public getQuestions(id: number): Promise< Array<IQuestions> | null > {
        return this.db.readQuestions(id);
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
    
    public getCQuestion(id: number): Promise< ICQuestions | null > {
        return this.db.readCQuestion(id);
    }

    public getCQuestionRevision(id: number, revision: number): Promise< ICQuestions | null > {
        return this.db.readCQuestionRevision(id, revision);
    }

    public pushCQuestions(categorid: number, data: any): Promise<boolean> {
        return this.db.writetCQuestion(categorid, data);
    }
}
