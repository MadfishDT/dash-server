import express from 'express';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import bodyparser from 'body-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { LoginSerivce } from './loginservice';
import cors from 'cors';
import { join } from 'path';
import uuid from 'uuid/v4';
import { IUserInfo } from './db/rawdb/dbs';

const responseResultCode = { 
  NOTEXISTUSER : 1,
  INVALIDACCESS : 2,
  INVALIDREQUEST : 3,
  NOTEXISTCONTENT : 4,
  EXPIRETOKEN : 5,
  NOTFOUNDSERVER : 6,
  REQUESTEXCEPTION : 7,
  UNKNOWN : 11,
  OK : 0,
} 

const corsOptions = {
    'origin': 'http://localhost:8080',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'credentials': true,
    'optionsSuccessStatus': 204
};

export class ServerRouter {
  public app : express.Application;
  
  /**
   * @ class App
   * @ method bootstrap
   * @ static
   *
   */
  private loginService: LoginSerivce;
  public static bootstrap (app : express.Application) : ServerRouter {
    return new ServerRouter(app);
  }

  constructor (app : express.Application) {
      this.app = app;
      this.loginService  = LoginSerivce.bootstrap();
  }

    public loadRouter() : boolean {
        const option = <cors.CorsOptions>corsOptions;
        this.app.use(cors(option) );
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        try{
            this.app.get('/', (req : express.Request, res : express.Response, next : express.NextFunction) => {
                res.send('Hello world');
        });
            this.addSessionRouter();
            this.addLoginRouter();
            this.addLogoutRouter();
            return true;
        } catch(e) {
            return false;
        }
  }

  private addSessionRouter(): void {

    const fileSessionStore = sessionFileStore(session);

    this.app.use( session({
        genid: (req) => {
            return uuid() // use UUIDs for session IDs
        },
        cookie: {
            maxAge: 1000 * 60 * 60 // 1H expire time
        },
        store: new fileSessionStore(),
        secret: '1fe2cf8077ee4cceb346081743c3edad',
        resave: false,
        rolling: true,
        saveUninitialized: true
    }));
        // configure passport.js to use the local strategy
    passport.use(new LocalStrategy.Strategy (
        { 
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email: string, password: string, done) => {
            console.log('Inside local strategy callback');
            const user = await this.loginService.tryLogin({email: email, password: password});
            if(user) {
                done(null, user);
            } else {
                done(null, null, { message: 'invalid login info' });
            }
            
        }
    ));

    // tell passport how to serialize the user
    passport.serializeUser((user: IUserInfo, done: any) => {
        console.log('Inside serializeUser callback. User id is save to the session file store here')
        done(null, user);
    });

    // tell passport how to deSerialize the user
    passport.deserializeUser((user: IUserInfo, done) => {
        console.log('Inside deserializeUser callback')
        console.log(`The user id passport saved in the session file store is: ${user}`);
        done(null, user);
    });

  }
 
  public addLogoutRouter() : void {

    this.app.post('/logout', async (req, res) => {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            return res.status(401).json({ result: false, message: 'invalid access' ,
            reason: responseResultCode.INVALIDACCESS, data: null});
        }
        const base64Credentials =  req.headers.authorization.split(' ')[1];
        const usertoken : string = Buffer.from(base64Credentials, 'base64').toString('ascii');

        if( usertoken) {
            let logouted : boolean = await this.loginService.tryLogout(usertoken);
            if(logouted) {
            res.status(200).json({result: true, data: null, message: 'ok',
            reasone: responseResultCode.OK});
        } else {
            res.status(401).json({ result : false, message: 'not logined user' , 
            reason: responseResultCode.NOTEXISTUSER, data: null});
        }
        }});
    }

    public addLoginRouter() : void {
        this.app.post('/login', async (req, res, next) => {
            passport.authenticate('local', (err, user, info) => {
                console.log(`req.user: ${JSON.stringify(req.user)}`)
                req.login(user, (loginError: any) => {
                    //console.log('Inside req.login() callback');
                    //console.log(`req.session.passport: ${JSON.stringify(req.session)}`);
                    //console.log(`req.session loginError : ${JSON.stringify(loginError)}`);
                    //console.log(`req.user: ${JSON.stringify(req.user)}`);
                    if (req.session && req.user) {
                        console.log('success login');
                        res.setHeader('Access-Control-Allow-Credentials', 'true');
                        return res.send('You were authenticated & logged in!\n');
                    } else {
                        console.log('fail login');
                        return res.sendStatus(401);
                    }
                });
            })(req, res, next);
        });  
    }
}
