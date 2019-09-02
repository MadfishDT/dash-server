import { DB, MySqlDB, ICategory, IQuestions, ICompany } from './rawdb/dbs';
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

    public getCategories(): Promise<ICategory[] | null> {
        return this.db.readCategories();
    }

    public getQuestions(id: number): Promise< Array<IQuestions> | null > {
        return this.db.readQuestions(id);
    }

    public getAnswers(uid: string): Promise< IAnswers | null > {
        return this.db.readAnswers(uid);
    }

    public pushAnswers(userid: string, categorid: number, jsonData: any): Promise<boolean> {
        return this.db.writeAnswers(userid, categorid, jsonData);
    }

    public pushAnswersConfirm(userid: string, categorid: number, jsonData: any): Promise<boolean> {
        return this.db.writeAnswersConfirm(userid, categorid, jsonData);
    }

    public getCompanys(): Promise<ICompany[] | null> {
        return this.db.readCompanys();
    }
}
