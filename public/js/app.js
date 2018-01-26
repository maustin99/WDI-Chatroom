console.log("Ready to start chatting?")


//console.log(io)

var socket = io()           //connects to server
var $ping = $('#ping')

var $messageField = $('#messageField')
var $sendBtn = $('#sendBtn')
var $chatDiv = $('#chatDiv')
var $userField = $('#userField')


$sendBtn.on('click', sendMessage )

function sendMessage(){

    var outboundMsg = $('#messageField').val() + "  - " + $('#userField').val()
    socket.emit('chat message' , outboundMsg)
    //socket.emit('send user name' , )
    console.log("Ping!")
    $('#messageField').val('')
    console.log('ping' , $('#messageField').val())
}

socket.on('connect', function(){
    console.log('Socket On: connected')
})

socket.on('transmited message', function(msg){
    //alert()
    console.log('transmitted msg:  ', msg)

    $chatDiv.prepend( `<p>${msg}</p>` );
    

})

//PONG
socket.on('pong message', function(){   //receving from server with 'pong...'
    console.log('the server ponged')
})
//---------

$ping.on('click', function(){
        socket.emit('ping message')
        console.log("Ping!")
})


