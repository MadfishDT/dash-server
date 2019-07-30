import * as express from 'express';
import { ServerRouter } from './serverrouter'
export class Server {
  public app : express.Application;
  private serverRouter : ServerRouter;
  /**
   * @ class App
   * @ method bootstrap
   * @ static
   *
   */
  public static bootstrap () : Server {
    return new Server();
  }

  constructor () {
    
    console.log('start bulk server');
    this.app = express.default();
    this.serverRouter = new ServerRouter(this.app);
  }

  public startServer() : void {

    console.log('start bulk server initializing');
    this.app.get('/', (req : express.Request, res : express.Response, next : express.NextFunction) => {
      res.send('bulk server activated');
    });

    if(this.serverRouter.loadRouter()) {
      console.log('success load routers');
    }
  }
}
