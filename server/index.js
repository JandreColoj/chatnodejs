var express = require ("express");
var bodyParser = require('body-parser');

var app = express();
var server = require("http").Server(app);
app.use(bodyParser.json()); 

var io = require("socket.io")(server);

app.use(express.static("cliente"));


app.post("/cambioPuerto",function(req,res){

    server.close ();

    server.listen(req.body.puerto,function(){
        console.log("Cambio de servidor  en el puerto: "+req.body.puerto); 
        res.send(req.body);    
    });
 
  
});


var messages =[{
    id: 1,
    text: "Bienvenido al chat privado de Jose",
    nickname: "Jandre",   
}];

io.on("connection",function(socket){
    console.log("el nodo con ip "+socket.handshake.address+" se a conectado");
    socket.emit("messages",messages);

    socket.on("add-message",function(data){

        messages.push(data);
        io.sockets.emit("messages",messages);

    });

});

server.listen(6677,function(){
    console.log("servidor funcionando en el puerto 6677");   
});



