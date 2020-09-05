const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const WebSocket = require("ws");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    handle(req, res, parsedUrl);
  });
  httpServer.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
  const wss = new WebSocket.Server({
    server: httpServer,
  });
  const allSockets = new Set();
  let lastMessage = "";
  wss.on("connection", (socket) => {
    allSockets.add(socket);

    socket.send(JSON.stringify({ message: lastMessage }));

    console.log("Client is connected!");

    socket.on("message", (data) => {
      const action = JSON.parse(data);
      const { key, message } = action;
      if (key !== "asdf1234") {
        throw new Error("bad key");
      }
      lastMessage = message;
      allSockets.forEach((socket) => {
        socket.send(
          JSON.stringify({
            message,
          })
        );
      });
      console.log("Client data!", data);
    });
    socket.on("close", () => {
      allSockets.delete(socket);
    });
  });
});
