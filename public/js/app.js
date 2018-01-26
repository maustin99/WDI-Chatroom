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

    //better solution
    var data = {
        name: $('#userField').val() ,
        message: $('#messageField').val()  
    }
    //^^^^^^^^^^^^^-------------

    //my solution
    var outboundMsg = $('#messageField').val() + "  - " + $('#userField').val()
    //^^^^^^^^^^^^^^-------------

    if ($('#messageField').val() != '' && $('#userField').val() != ''){
            socket.emit('chat message' , data)
            //socket.emit('send user name' , )
            //console.log("Ping!")
            $('#messageField').val('')
            console.log('Ping!' , $('#messageField').val())
    }else alert('All fields must be filled')
} //END Send Message

socket.on('connect', function(){
    console.log('Socket On: connected')
})

socket.on('transmited message', function(msg){
    //alert()
    console.log('transmitted msg:  ', msg)

    $chatDiv.prepend( `<p>${msg.message}   - ${msg.name}</p>` );
    

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


