import express from 'express';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import bodyparser from 'body-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { LoginSerivce } from './login.service';
import cors from 'cors';
import uuid from 'uuid/v4';
import { IUserInfo } from './db/rawdb/dbs';
import { ResponseUtils } from './response';
import { ContentsService } from './content.service';

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
  private contentService: ContentsService;
  public static bootstrap (app : express.Application) : ServerRouter {
    return new ServerRouter(app);
  }

  constructor (app : express.Application) {
      this.app = app;
      this.loginService  = LoginSerivce.bootstrap();
      this.contentService = ContentsService.bootstrap();
  }

    public loadRouter() : boolean {
        const option = <cors.CorsOptions>corsOptions;
        this.addSessionRouter();
         
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        
        this.app.use(cors(option) );
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({ extended: true } ));
        this.app.use('/photo', express.static(__dirname + '/../assets'));
        console.log(`current path is: ${__dirname}`);
            try{
                this.app.get('/', (req : express.Request, res : express.Response, next : express.NextFunction) => {
                    res.send('Hello world');
            });
            this.addLoginRouter();
            this.addAdminLoginRouter();
            this.addLogoutRouter();
            this.addGetUserRouter();
            this.addProfileRequestRouter();
            this.addAuthrequiredRouter();
            this.addGetCategoriesRouter();
            this.addGetQuestionsRouter();
            this.addGetAnswersRouter();
            this.addAnswerRouter();
            return true;
        } catch(e) {
            return false;
        }
  }

  private addSessionRouter(): void {

    const fileSessionStore = sessionFileStore(session);

    this.app.use( session({
        genid: (req) => {
            console.log('Inside session middleware genid function')

            return uuid() // use UUIDs for session IDs
        },
        cookie: {
            maxAge: 1000 * 60 * 60 // 1H expire time
        },
        store: new fileSessionStore(),
        secret: '1fe1cf8077ee4cceb346081743c3edad',
        resave: false,
        rolling: true,
        saveUninitialized: true
    }));
        // configure passport.js to use the local strategy
    passport.use(new LocalStrategy.Strategy (
        { 
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req: express.Request ,email: string, password: string, done) => {
            console.log('Inside local strategy callback');
            let code  = 0;
            let user = null;
            let authTypeHeader = req.header('X-Auth-Types');
            console.log(`login type check: ${authTypeHeader}-${req.body}`);
            if(authTypeHeader === 'admin') {
                code = req.body.code;
                if(code) {
                    user = await this.loginService.tryAdminLogin({email: email, password: password}, code);
                }
            } else {
                user = await this.loginService.tryLogin({email: email, password: password});
            }
            if(user) {
                done(null, user);
            } else {
                done(null, null, { message: 'invalid login info' });
            }
            
        }
    ));

    // tell passport how to serialize the user
    passport.serializeUser((user: IUserInfo, done: any) => {
        console.log(`Inside serializeUser callback. User id is save to the session file store here ${JSON.stringify(user)}`)
        done(null, user);
    });

    // tell passport how to deSerialize the user
    passport.deserializeUser((user: IUserInfo, done) => {
        console.log('Inside deserializeUser callback')
        done(null, user);
    });
    console.log('finish add passport se de rialized');

  }
 
    public addLogoutRouter() : void {

        this.app.post('/logout', async (req, res) => {
            if(req.isAuthenticated()) {
                req.logout();
            }
            res.sendStatus(401); 
        });
    }

    public addGetCategoriesRouter(): void {
        this.app.get('/categories', async (req, res) => {
            console.log('catagories');
            if(req.isAuthenticated()) {
                if(req.session && req.user) {
                    let result = await this.contentService.getCategories();
                    console.log(`catagories: ${JSON.stringify(result)}`);
                    if(result && result.length > 0) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                } else {
                    res.sendStatus(401);
                }
            }
        })
    }

    public addGetAnswersRouter(): void {
        this.app.get('/answers', async (req, res) => {
            console.log('get answers');
            if(req.isAuthenticated()) {
                if(req.session && req.user) {
                    if(req.query.id) {
                        let result = await this.contentService.getAnswers(req.query.id);
                        console.log(`get answers: ${JSON.stringify(result)}`);
                        if(result) {
                            res.json(result);
                        } else {
                            res.sendStatus(404);
                        }
                    } else {
                        res.sendStatus(400);
                    }
                } else {
                    res.sendStatus(401);
                }
            }
        });
    }

    public addGetQuestionsRouter(): void {
        this.app.get('/questions', async (req, res) => {
            console.log('readQuestions');
            if(req.isAuthenticated()) {
                if(req.session && req.user) {
                    if(req.query.id) {
                        console.log(`req.query.id ${req.query.id}`);
                        let id = parseInt(req.query.id, 10);
                        let result = await this.contentService.getQuestions( id );
                        if(result && result.length > 0) {
                            res.json(result);
                        } else {
                            res.sendStatus(404);
                        }
                    } else {
                        res.sendStatus(400);
                    }
                   
                } else {
                    res.sendStatus(401);
                }
            }
        })
    }

    public addGetUserRouter(): void {
        this.app.get('/profile', async (req, res) => {
            if(req.isAuthenticated()) {
                if (req.session && req.user) {
                    let userProfile = await this.loginService.getUser(req.user.id);
                    console.log(`request user profile is: ${JSON.stringify(userProfile)}`);
                    if (userProfile) {
                        res.json(userProfile);
                    } else {
                        res.sendStatus(204); // not found user reponse
                    }
                } else {
                    res.sendStatus(401);
                }
            }
        })
    }

    public addAuthrequiredRouter(): void {
        this.app.get('/authrequired', (req, res) => {
            console.log(`User authenticated? ${req.isAuthenticated()}`);
            if(req.isAuthenticated()) {
                res.status(200).json(req.user);
            } else {
                res.sendStatus(401);
            }
        });
    }

    public addProfileRequestRouter(): void {
        this.app.get('/profile', async (req, res) => {
            console.log(`User profile? ${req.isAuthenticated()}`);
            if(req.isAuthenticated()) {
                console.log(req.user.id);
                let userProfile = await this.loginService.getUser(req.user.id);
                res.status(200).json(userProfile);
            } else {
                res.sendStatus(401);
            }
        });
    }

    public addLoginRouter() : void {
        this.app.post('/login', async (req, res, next) => {
            passport.authenticate('local', (err, user, info) => {
                req.login(user, (loginError: any) => {
                    console.log(`req.session.passport: ${JSON.stringify(req.session!.passport)}`);
                    if (req.session && req.user) {
                        console.log('success login');
                        res.setHeader('Access-Control-Allow-Credentials', 'true');
                        res.type('json');
                        return res.json(req.user);
                        //return res.send('You were authenticated & logged in!\n');
                    } else {
                        console.log('fail login');
                        return res.sendStatus(401);
                    }
                });
            })(req, res, next);
        });  
    }

    public addAnswerRouter() : void {
        this.app.post('/answers', async (req, res, next) => {
            if(req.isAuthenticated()) {
                const data = req.body.answers;
                console.log(`post answer ${req.body}`);
                console.log(`post answer's info ${req.user.id}`);
                const result = await this.contentService.pushAnswers(req.user.id,req.body.cid,req.body.answers);
                if(result) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(400);
                }
            } else {
                res.sendStatus(401);
            }
        });  
    }

    public addAnswerConfirmRouter() : void {
        this.app.post('/canswers', async (req, res, next) => {
            if(req.isAuthenticated()) {
                const data = req.body.answers;
                console.log(`post answer ${req.body}`);
                console.log(`post answer's info ${req.user.id}`);
                const result = await this.contentService.pushAnswers(req.user.id,req.body.cid,req.body.answers);
                if(result) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(400);
                }
            } else {
                res.sendStatus(401);
            }
        });  
    }

    public addAdminLoginRouter() : void {
        this.app.post('/adminlogin', async (req, res, next) => {
            passport.authenticate('local', (err, user, info) => {
                req.login(user, (loginError: any) => {
                    console.log(`req.session.passport: ${JSON.stringify(req.session!.passport)}`);
                    if (req.session && req.user) {
                        console.log('success login');
                        res.setHeader('Access-Control-Allow-Credentials', 'true');
                        res.type('json');
                        return res.json(req.user);
                        //return res.send('You were authenticated & logged in!\n');
                    } else {
                        console.log('fail login');
                        return res.sendStatus(401);
                    }
                });
            })(req, res, next);
        });  
    }
}
