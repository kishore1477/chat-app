var socket = io();
 var name1 = prompt("Enter your name.")
if(name1){
    console.log("name is ", name1)
    socket.emit('new-user-joined', name1)

//  send message to the server
    var form = document.getElementById('send-msg');
    var input = document.getElementById('inputsend');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (input.value) {
        socket.emit('send', input.value);
        input.value = '';
      }
    });
    // recieve message from the server to the all connected user

    socket.on('receive', data =>{
        console.log("data is", data)
        const para = document.createElement("p");
para.innerText = "This is a paragraph";
document.body.appendChild(para);
    })
}else{
    alert("Please Enter your name while joining the chat.")
     

}
