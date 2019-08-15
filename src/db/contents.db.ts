import { DB, MySqlDB, ICategory } from './rawdb/dbs';

export class ContentsDB {
    
    private static instance : ContentsDB;
    private db : DB;

    constructor() {
        if (ContentsDB.instance) {
            throw new Error('Error - use UserDB.getInstance()');
        }
        this.db = MySqlDB.getInstance();
    }

    public static getInstance() : ContentsDB {
        ContentsDB.instance = ContentsDB.instance || new ContentsDB();
        return ContentsDB.instance;
    }

    public getCategories() : Promise<ICategory[] | null> {
        return this.db.readCategories();
    }
}
