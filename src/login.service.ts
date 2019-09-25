import { Gernerators } from './generators'
import { UserDB} from './db/user.db';
import { IUserInfo, IUserProfile } from './db/dto/datadef';
import * as rx from 'rx';
import { stringify } from 'querystring';

export class LoginSerivce {
  // tslint:disable-next-line:typedef-whitespace
  private validTokens: Map<string, Date>;
  private generators: Gernerators;
  private loginRequestSubject : rx.Subject<IUserInfo>;
  private userDB : UserDB; 

    public static bootstrap () : LoginSerivce {
        return new LoginSerivce();
    }

    constructor () {
        this.validTokens = new Map<string, Date>();
        this.generators = Gernerators.bootstrap();
        this.loginRequestSubject = new rx.Subject<IUserInfo>();
        
        this.userDB = UserDB.getInstance();

        this.loginRequestSubject.subscribe( async (info : IUserInfo) => {
        await this.tryLogin(info);
        })
    }
    public get sessionDBOptions(): any {
        return this.userDB.sessionDBOptions();
    }
    public extentdToken(token : string) : boolean {
        let findToken = this.validTokens.get(token);
        if(findToken) {
        this.validTokens.set(token, new Date());
        return true;
        }
        return false;
    }

    public validateToken(token : string) : boolean {
        let time = this.validTokens.get(token);
        if(time) {
        const now = new Date();
        let diff =  (now.getTime() - time.getTime())/1000;
        if(diff > 6000) {
            this.validTokens.delete(token);
            return false;
        } else {
            return true;
        }
        }
        return false;
    }

    public tryLogout(token : string) : Promise<boolean> {
        return new Promise<boolean>( (resolve) => {
        if(this.validTokens.get(token)) {
            this.validTokens.delete(token);
            resolve(true);
        } else {
            resolve(false);
        }
        });
    }
    public async pushNewUser(user: any): Promise<boolean> {
        const result = await this.userDB.pushNewUser(user);
        return result;
    }
    public async updateAgreement(userid: string) : Promise<boolean> {
        const result = await this.userDB.updateAgreement(userid);
        return result;
    }
    public async getUser(id: string) : Promise<IUserProfile | null> {
        let result = await this.userDB.getUser(id);
        return result;
    }
    public async getUserByEmail(email: string): Promise<IUserInfo | null> {
        let result = await this.userDB.getValidUserByEmail(email);
        return result;
    }

    public tryAdminLogin(info : IUserInfo, code: number) : Promise<IUserInfo | null> {
        return new Promise<IUserInfo | null>( async (resolve) => {
            try {
                let result = await this.userDB.getValidAdminUser(info, code);
                if(result) {
                    resolve(result);
                    return;
                } else {
                    console.log('login fail');
                }
            resolve(null);
            return;
            }
            catch(e) {
                resolve(null);
            }    
        });
    }

    public tryLogin(info : IUserInfo) : Promise<IUserInfo | null> {
        return new Promise<IUserInfo | null>( async (resolve) => {
            try {
                let result = await this.userDB.getValidUser(info);
                if(result) {
                    resolve(result);
                    return;
                } else {
                    console.log('login fail');
                }
            resolve(null);
            return;
            }
            catch(e) {
                resolve(null);
            }    
        });
    }

}
