"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const serverrouter_1 = require("./serverrouter");
class Server {
    /**
     * @ class App
     * @ method bootstrap
     * @ static
     *
     */
    static bootstrap() {
        return new Server();
    }
    constructor() {
        console.log('start bulk server');
        this.app = express.default();
        this.serverRouter = new serverrouter_1.ServerRouter(this.app);
    }
    startServer() {
        console.log('start bulk server initializing');
        this.app.get('/', (req, res, next) => {
            res.send('bulk server activated');
        });
        if (this.serverRouter.loadRouter()) {
            console.log('success load routers');
        }
    }
}
exports.Server = Server;
