import { Gernerators } from './generators'
import { ContentsDB} from './db/contents.db';
import { ICategory, IQuestions, IAnswers, ICompany, ICQuestions } from './db/dto/datadef';
import * as fs from 'fs';
import * as rx from 'rx';
import { stringify } from 'querystring';

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
    
    public async getCategories(companyCode: string): Promise<ICategory[] | null> {
        let result = await this.contentsDB.getCategories(companyCode);
        return result;
    }

    public async getQuestions(id: number): Promise<IQuestions[] | null> {
        let result = await this.contentsDB.getQuestions(id);
        return result;
    }

    public async getAnswers(cid: number, userID: string): Promise<IAnswers | null>  {
        let result = await this.contentsDB.getAnswers(cid, userID);
        return result;
    }

    public async getUserAnswers(cid: number): Promise<IAnswers[] | null>  {
        let result = await this.contentsDB.getUserAnswers(cid);
        return result;
    }
    public async pushAnswers(userid: string, categoryid: number, questionid: number, answers: any): Promise<boolean>  {
        let result = await this.contentsDB.pushAnswers(userid, categoryid, questionid, answers);
        return result;
    }

    public async getCompanys(): Promise<ICompany[] | null> {
        let result  = await this.contentsDB.getCompanys();
        return result;
    }

    public async getCQuestion(id: number): Promise< ICQuestions | null > {
        return this.contentsDB.getCQuestion(id);
    }

    public async getCQuestionRevision(id: number, revision: number): Promise< ICQuestions | null > {
        return this.contentsDB.getCQuestionRevision(id, revision);
    }

    public async  pushCQuestions(categorid: number, data: any): Promise<boolean> {
        return this.contentsDB.pushCQuestions(categorid, data);
    }

}
