import 'source-map-support/register'; // source-map을 사용하기 위해 추가함.
import { Server } from './server';
import * as express from 'express';
const server : Server = new Server()
const port : number = Number(process.env.PORT) || 9090;
const app : express.Application = server.app;

app.listen(port, () => {
    console.log(`Express server listening at ${port}`);
    server.startServer();
})
.on('error', err => console.error(err));
