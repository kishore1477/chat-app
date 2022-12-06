 

const express = require('express');
const app = express();
app.use(express.static("."));
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
 
const users= {}
// create connection 
io.on("connection", socket=>{
    // https://socket.io/docs/v4/server-socket-instance/
    socket.on('new-user-joined', name=>{
      
        console.log("new user", name)
        // insert name of user in users object by using socket id
        users[socket.id] = name
        // send message to all user 
        io.emit('user-joined', name)

    })
    // send message to all the connected users
    socket.on('send', message=>{
        console.log("message is", message)
         io.emit('receive', {message:message, name: users[socket.id]})
    })
    socket.on('disconnect', message=>{
         io.emit('left',  users[socket.id])
         delete users[socket.id]
    })

})
server.listen(5000, () => {
  console.log('listening on *:5000');
});
















