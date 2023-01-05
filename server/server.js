import jsonServer from "json-server";
import auth from "json-server-auth";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
server.db = router.db;

server.use(middlewares);

const rules = auth.rewriter({
	users: 640,
	conversations: 660,
	messages: 660,
});

server.use(rules);
server.use(auth);
server.use(router);

server.listen(port);
