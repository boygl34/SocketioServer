
const jsonServer = require('json-server');
const http = require('http')
const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
app.use(middlewares)
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = require("socket.io")(server, {
    cors: { origin: '*' }
  });
// Tạo connection tới database
app.use(router)
app.use(middlewares)
const db = router.db;
io.on('connection', (socket) => {

    console.log('Client connected');
    console.log(db.get())

    socket.on('login', (data) => {
        console.log('login',data)
        io.emit('login', db);    
    io.emit('login', data);
    });




});

server.listen(port, () => {
console.log(`Server listening on port ${port}`);

});