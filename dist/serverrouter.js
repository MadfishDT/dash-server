"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const login_service_1 = require("./login.service");
const cors_1 = __importDefault(require("cors"));
const v4_1 = __importDefault(require("uuid/v4"));
const content_service_1 = require("./content.service");
const MySQLStore = require('express-mysql-session')(express_session_1.default);
const responseResultCode = {
    NOTEXISTUSER: 1,
    INVALIDACCESS: 2,
    INVALIDREQUEST: 3,
    NOTEXISTCONTENT: 4,
    EXPIRETOKEN: 5,
    NOTFOUNDSERVER: 6,
    REQUESTEXCEPTION: 7,
    UNKNOWN: 11,
    OK: 0,
};
const corsOptions = {
    'origin': ['http://localhost:8080', 'http://localhost:8081', 'http://qesg-dev.ddns.net:8080', 'http://qesg-dev.ddns.net:80',
        'http://localhost:8082', 'http://35.193.127.219:8080'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'credentials': true,
    'optionsSuccessStatus': 204
};
class ServerRouter {
    static bootstrap(app) {
        return new ServerRouter(app);
    }
    constructor(app) {
        this.app = app;
        this.loginService = login_service_1.LoginSerivce.bootstrap();
        this.contentService = content_service_1.ContentsService.bootstrap();
    }
    loadRouter() {
        const option = corsOptions;
        this.addSessionRouter();
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        this.app.use(cors_1.default(option));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use('/photo', express_1.default.static(__dirname + '/../assets'));
        try {
            this.app.get('/', (req, res, next) => {
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
            this.addAgreementRouter();
            this.addGetCompanysRouter();
            this.addGetCQuestionsRouter();
            return true;
        }
        catch (e) {
            return false;
        }
    }
    addSessionRouter() {
        const sqlStore = new MySQLStore({
            host: '35.193.127.219',
            user: 'root',
            password: 'Jjang$194324',
            database: 'sessions',
        });
        this.app.use(express_session_1.default({
            genid: (req) => {
                return v4_1.default(); // use UUIDs for session IDs
            },
            cookie: {
                maxAge: 1000 * 60 * 30 // 10 min expire time
            },
            store: sqlStore,
            secret: '1fe1cf8077ee4cceb346081743c3edad',
            resave: true,
            rolling: true,
            saveUninitialized: false
        }));
        // configure passport.js to use the local strategy
        passport_1.default.use(new passport_local_1.default.Strategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, (req, email, password, done) => __awaiter(this, void 0, void 0, function* () {
            let code = 0;
            let user = null;
            let authTypeHeader = req.header('X-Auth-Types');
            if (authTypeHeader === 'admin') {
                code = req.body.code;
                if (code) {
                    user = yield this.loginService.tryAdminLogin({ email: email, password: password }, code);
                }
            }
            else {
                user = yield this.loginService.tryLogin({ email: email, password: password });
            }
            if (user) {
                done(null, user);
            }
            else {
                done(null, null, { message: 'invalid login info' });
            }
        })));
        // tell passport how to serialize the user
        passport_1.default.serializeUser((user, done) => {
            done(null, user);
        });
        // tell passport how to deSerialize the user
        passport_1.default.deserializeUser((user, done) => {
            done(null, user);
        });
    }
    addLogoutRouter() {
        this.app.post('/logout', (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.isAuthenticated()) {
                console.log('logouted');
                req.logout();
            }
            res.sendStatus(200);
        }));
    }
    addGetCategoriesRouter() {
        this.app.get('/categories', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('catagories');
            if (req.isAuthenticated()) {
                if (req.session && req.user) {
                    let result = yield this.contentService.getCategories();
                    if (result && result.length > 0) {
                        res.json(result);
                    }
                    else {
                        if (!req.user.agreement) {
                            res.sendStatus(451);
                        }
                        else {
                            res.sendStatus(404);
                        }
                    }
                }
                else {
                    res.sendStatus(401);
                }
            }
        }));
    }
    addGetAnswersRouter() {
        this.app.get('/answers', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('get answers');
            if (req.isAuthenticated()) {
                if (req.session && req.user) {
                    if (req.query.id) {
                        let result = yield this.contentService.getAnswers(req.query.id);
                        if (result) {
                            res.json(result);
                        }
                        else {
                            res.sendStatus(404);
                        }
                    }
                    else {
                        res.sendStatus(400);
                    }
                }
                else {
                    res.sendStatus(401);
                }
            }
        }));
    }
    addInsertCQuestionsRouter() {
    }
    addGetCQuestionsRouter() {
        this.app.get('/cquestions', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('readcQuestions');
            if (req.isAuthenticated()) {
                if (req.session && req.user) {
                    if (req.query.id) {
                        let id = parseInt(req.query.id, 10);
                        let result = yield this.contentService.getQuestions(id);
                        if (result && result.length > 0) {
                            res.json(result);
                        }
                        else {
                            res.sendStatus(404);
                        }
                    }
                    else {
                        res.sendStatus(400);
                    }
                }
                else {
                    res.sendStatus(401);
                }
            }
        }));
    }
    addGetQuestionsRouter() {
        this.app.get('/questions', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('readQuestions');
            if (req.isAuthenticated()) {
                if (req.session && req.user) {
                    if (req.query.id) {
                        let id = parseInt(req.query.id, 10);
                        let result = yield this.contentService.getQuestions(id);
                        if (result && result.length > 0) {
                            res.json(result);
                        }
                        else {
                            res.sendStatus(404);
                        }
                    }
                    else {
                        res.sendStatus(400);
                    }
                }
                else {
                    res.sendStatus(401);
                }
            }
        }));
    }
    addGetCompanysRouter() {
        this.app.get('/comp', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let companys = yield this.contentService.getCompanys();
            if (companys) {
                res.json(companys);
            }
            else {
                res.sendStatus(204); // not found user reponse
            }
        }));
    }
    addGetUserRouter() {
        this.app.get('/profile', (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.isAuthenticated()) {
                if (req.session && req.user) {
                    let userProfile = yield this.loginService.getUser(req.user.id);
                    if (userProfile) {
                        res.json(userProfile);
                    }
                    else {
                        res.sendStatus(204); // not found user reponse
                    }
                }
                else {
                    res.sendStatus(401);
                }
            }
        }));
    }
    addAgreementRouter() {
        this.app.post('/agree', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(`update agreement? ${req.isAuthenticated()}`);
            if (req.isAuthenticated()) {
                let result = yield this.loginService.updateAgreement(req.user.id);
                if (result) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(500);
                }
            }
            else {
                res.sendStatus(401);
            }
        }));
    }
    addAuthrequiredRouter() {
        this.app.get('/authrequired', (req, res) => {
            console.log(`User authenticated? ${req.isAuthenticated()}`);
            if (req.isAuthenticated()) {
                res.status(200).json(req.user);
            }
            else {
                res.sendStatus(401);
            }
        });
    }
    addProfileRequestRouter() {
        this.app.get('/profile', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(`User profile? ${req.isAuthenticated()}`);
            if (req.isAuthenticated()) {
                console.log(req.user.id);
                let userProfile = yield this.loginService.getUser(req.user.id);
                res.status(200).json(userProfile);
            }
            else {
                res.sendStatus(401);
            }
        }));
    }
    addLoginRouter() {
        this.app.post('/login', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            passport_1.default.authenticate('local', (err, user, info) => {
                req.login(user, (loginError) => {
                    if (req.session && req.user) {
                        console.log('success login');
                        res.setHeader('Access-Control-Allow-Credentials', 'true');
                        res.type('json');
                        return res.json(req.user);
                        //return res.send('You were authenticated & logged in!\n');
                    }
                    else {
                        console.log('fail login');
                        return res.sendStatus(401);
                    }
                });
            })(req, res, next);
        }));
    }
    addAnswerRouter() {
        this.app.post('/answers', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.isAuthenticated()) {
                const data = req.body.answers;
                const result = yield this.contentService.pushAnswers(req.user.id, req.body.cid, req.body.answers);
                if (result) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(400);
                }
            }
            else {
                res.sendStatus(401);
            }
        }));
    }
    addAnswerConfirmRouter() {
        this.app.post('/canswers', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.isAuthenticated()) {
                const data = req.body.answers;
                const result = yield this.contentService.pushAnswers(req.user.id, req.body.cid, req.body.answers);
                if (result) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(400);
                }
            }
            else {
                res.sendStatus(401);
            }
        }));
    }
    addAdminLoginRouter() {
        this.app.post('/adminlogin', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            passport_1.default.authenticate('local', (err, user, info) => {
                req.login(user, (loginError) => {
                    if (req.session && req.user) {
                        console.log('success login');
                        res.setHeader('Access-Control-Allow-Credentials', 'true');
                        res.type('json');
                        return res.json(req.user);
                        //return res.send('You were authenticated & logged in!\n');
                    }
                    else {
                        console.log('fail login');
                        return res.sendStatus(401);
                    }
                });
            })(req, res, next);
        }));
    }
}
exports.ServerRouter = ServerRouter;
