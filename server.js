
const
express = require('express'),
app = express(),

server = require('http').createServer(app),
io = require('socket.io')(server),

logger = require('morgan'),
port = process.env.PORT || 3000






io.on('connect', (socket) => {   //client connects ::: when connected through socket, send tweet to client browser
    
    //PING-------
    socket.on('ping message', function(){ //SOCKET access connection ::: receives on socket:: then executes function
      console.log("Someone ping'd")  
      io.emit('pong message')    // using IO::: transmits to all connected browsers on 3000
    }) //end socket
    //------------


    socket.on('chat message', function(msg){

        console.log('incoming message: ' + msg);

        io.emit('transmited message', msg)
        console.log("Someone ping'd") 

      }) //end SOCKET

      
  
}) //END IO connection



app.use(logger('dev'))
app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  res.sendFile(`{__dirname}/public/index.html`)
})


// listen to requests on PORT 3000 
server.listen(port, (err) =>{
    console.log(err || "Server Running on Port 3000.")
})
