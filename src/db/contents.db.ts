import { DB, MySqlDB, ICategory, IQuestions } from './rawdb/dbs';

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
}
