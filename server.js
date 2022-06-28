const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db_server.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;
server.use(middlewares);
server.use(
    jsonServer.rewriter({
        "/api/*":"/$1"
    })
);
server.use(router);
server.listen(port, () => {
    console.log(`Server dang chay tren port: ${port}`);
});