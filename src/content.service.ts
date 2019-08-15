import { Gernerators } from './generators'
import { ContentsDB} from './db/contents.db';
import { ICategory } from './db/dto/datadef';
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
    
    public async getCategories() : Promise<ICategory[] | null> {
        let result = await this.contentsDB.getCategories();
        return result;
    }
}
