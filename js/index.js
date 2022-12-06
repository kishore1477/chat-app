var socket = io();
 var name1 = prompt("Enter your name.")
if(name1){
    

//  send message to the server
    var form = document.getElementById('send-msg');
    var input = document.getElementById('inputsend');
    var messageContainer = document.querySelector('.container-show')
    const audio = new Audio('../tone.mp3')
    const append = (message,position) =>{
      let element = document.createElement("div");
      element.innerHTML = message
      element.classList.add('message')
      element.classList.add(position)
      messageContainer.append(element)
      if(position == 'left'){
        audio.play()

      }
       }
    socket.emit('new-user-joined', name1)
    
    socket.on('user-joined', name=>{
      if(name != name1){
        append(`<b>${name} </b> : join the chat.`, 'left')
        audio.play()

      }
    })
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (input.value) {
        socket.emit('send', input.value);
        append(`<b>You</b>:${input.value}`, 'right')
        input.value = '';
      }
    });
  
     // recieve message from the server to the all connected user

    socket.on('receive', data =>{
        
        if(data.name!=name1){
          append(`<b>${data.name}</b>:${data.message}`, 'left')

        }
      
    })
    // left the chat
    socket.on('left', name =>{
        // if(name!=name1){
          append(`<b>${name}</b>: Left the chat.`, 'left')

        // }
      
    })
}else{
    alert("Please Enter your name while joining the chat.")
     

}
