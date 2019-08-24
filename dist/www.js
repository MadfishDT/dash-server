"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register"); // source-map을 사용하기 위해 추가함.
const server_1 = require("./server");
const server = new server_1.Server();
const port = Number(process.env.PORT) || 9090;
const app = server.app;
app.listen(port, () => {
    console.log(`Express server listening at ${port}`);
    server.startServer();
})
    .on('error', err => console.error(err));
