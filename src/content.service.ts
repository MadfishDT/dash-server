import { Gernerators } from './generators'
import { ContentsDB} from './db/contents.db';
import { ICategory, IQuestions, IAnswers, ICompany, ICQuestions, IUserAnswers, ICCategory } from './db/dto/datadef';
import * as fs from 'fs';
import * as rx from 'rx';
import { stringify } from 'querystring';
import * as uuidv1 from 'uuid/v1';

export class ContentsService {
  // tslint:disable-next-line:typedef-whitespace
  private generators: Gernerators;
  private categoriesSubject : rx.Subject<ICategory[]>;
  private contentsDB : ContentsDB; 

    public static bootstrap () : ContentsService {
        return new ContentsService();
    }

    constructor () {
        this.generators = Gernerators.bootstrap();
        this.categoriesSubject = new rx.Subject<ICategory[]>();
        this.contentsDB = ContentsDB.getInstance();
    }
    public getNewUID(): string {
        let guid = uuidv1.default();
        return guid;
    }    
    public async getCategories(companyCode: string): Promise<ICategory[] | null> {
        let result = await this.contentsDB.getCategories(companyCode);
        return result;
    }

    public async getQuestions(id: string): Promise<IQuestions[] | null> {
        let result = await this.contentsDB.getQuestions(id);
        return result;
    }

    public async getAnswers(cid: number, userID: string): Promise<IAnswers | null>  {
        let result = await this.contentsDB.getAnswers(cid, userID);
        return result;
    }
    public async getAnswersById(answerId: number): Promise<IAnswers | null>  {
        let result = await this.contentsDB.getAnswersById(answerId);
        return result;
    }
    public async getUserAnswers(cid: string): Promise<IUserAnswers[] | null>  {
        let result = await this.contentsDB.getUserAnswers(cid);
        return result;
    }
    public async pushAnswers(userid: string, categoryid: string, questionid: number, answers: any): Promise<boolean>  {
        let result = await this.contentsDB.pushAnswers(userid, categoryid, questionid, answers);
        return result;
    }

    public async getCompanys(): Promise<ICompany[] | null> {
        let result  = await this.contentsDB.getCompanys();
        return result;
    }

    public async getCQuestion(id: string): Promise< ICQuestions | null > {
        return this.contentsDB.getCQuestion(id);
    }

    public async getCQuestionRevision(id: number, revision: number): Promise< ICQuestions | null > {
        return this.contentsDB.getCQuestionRevision(id, revision);
    }

    public async  pushCQuestions(categorid: string, data: any): Promise<boolean> {
        return this.contentsDB.pushCQuestions(categorid, data);
    }

    public async pushCCategories(ccode: string, code: string, data: any, desc: string): Promise<boolean> {
        return this.contentsDB.pushCCategories(ccode, code, data, desc);
    }

    public getCCategories(companyCode: string, code: string): Promise<ICCategory | null>  {
        return this.contentsDB.getCCategories(companyCode, code);
    }

    public getCCategoriesByCCode(companyCode: string): Promise<ICCategory | null>  {
        return this.contentsDB.getCCategoriesByCCode(companyCode);
    }
    public existCompany(code: string): Promise<boolean> {
        return this.contentsDB.existCompanyCode(code);
    }
}
