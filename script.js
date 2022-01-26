const socket  = io('http://localhost:3000', {transports: ['websocket', 'polling', 'flashsocket']});
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')


const user_name = prompt('What is your name')
appendMessage('You Joined')
socket.emit('new-user', user_name);


socket.on('chat-message', data=>{
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', user_name=>{
    appendMessage(`${user_name} connected`)
    
})

socket.on('user-disconnected', user_name=>{
    appendMessage(`${user_name} disconnected`)
})

messageForm.addEventListener('submit', e=>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)

    messageInput.value=''

})


function appendMessage(message){
    const messageElement =  document.createElement('div')
    messageElement.innerText = message

    messageContainer.append(messageElement)
}