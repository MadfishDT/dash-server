import { DB, MySqlDB, ICategory, IQuestions, ICompany, ICQuestions,ICCampaign, IPortfolioInfos, IUserAnswers, ICCategory } from './rawdb/dbs';
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

    public getUserAnswers(categoryid: string): Promise< IUserAnswers[] | null > {
        return this.db.readUserAnswers(categoryid);
    }

    public pushAnswers(userid: string, categorid: string, questionsid: number, jsonData: any): Promise<boolean> {
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
    public removeCCategory(code: string): Promise<boolean> {
        return this.db.deleteCCategory(code);
    }
    public pushCQuestions(categorid: string, data: any): Promise<boolean> {
        return this.db.writeCQuestion(categorid, data);
    }
    public updateCCategoryName(code: string, name: any): Promise<boolean> {
        return this.db.updateCCategoryName(code, name);
    }
    public updateCCategories(code: string, jsonData: any, descs: string): Promise<boolean> {
        return this.db.updateCCategories(code, jsonData, descs);
    }
    public pushCCategories(ccode: string, code: string, data: any, desc: string): Promise<boolean> {
        return this.db.writeCCategories(ccode, code, data, desc);
    }
    public pushNCCategories(code: string, name: string, userId: string): Promise<boolean> {
        return this.db.writeNCCategories(code, name, userId);
    }
    public getCCategories(companyCode: string, code: string): Promise<ICCategory | null>  {
        return this.db.readCCategories(companyCode, code);
    }
    public getCCategoriesByCCode(companyCode: string): Promise<ICCategory | null>  {
        return this.db.readCCategoriesByCCode(companyCode);
    }

    public getCCategoriesByUser(userID: string): Promise<ICCategory[] | null>  {
        return  this.db.readCCategoriesByUser(userID);
    }
   
    public existCompanyCode(code: string): Promise<boolean> {
        return this.db.existCompanyCode(code);
    }
    public getCampaignsByUser(userId: string): Promise<ICCampaign[] | null> {
        return this.db.readCampaignsByUser(userId);
    }
    public getCampaignById(uid: string): Promise<ICCampaign | null> {
        return this.db.readCampaignById(uid);
    }
    public pushCampaign(campignInfo: any): Promise<boolean> {
        return this.db.writeCampaign(campignInfo);
    }
    public updateCampaign(campignInfo: any): Promise<boolean> {
        return this.db.updateCampaign(campignInfo);
    }
    public updateCampaignStatus(uid: string, activated: boolean): Promise<boolean> {
        return this.db.updateCampaignStatus(uid, activated);
    }
    public updateCampaignTemplate(uid: string, ccode: string): Promise<boolean> {
        return this.db.updateCampaignTemplate(uid, ccode);
    }
    public deleteCampaign(uid: string): Promise<boolean> {
        return this.db.deleteCampaign(uid);
    }
    public getPortfolios(userId: string): Promise<IPortfolioInfos[] | null>  {
        return this.db.readPortfolios(userId);
    }

    public pushCampaignCompanyMapping(campaign: ICCampaign, companyCodes: Array<string>): Promise<boolean> {
        return this.db.insertCampaignCompanyMapping(campaign, companyCodes);
    }

    public getCampaignCompanyMappings(uid: string): Promise<IPortfolioInfos | null> {
        return this.db.readCampaignCompanyMappings(uid);
    }
    public getCCategoriesByCode(code: string): Promise<ICCategory | null> {
        return this.db.readCCategoriesByCode(code);
    }
    public getCampaignByCompany(ccode: string): Promise<ICCampaign[] | null> {
        return this.db.readCampaignByCompany(ccode);
    }
}
