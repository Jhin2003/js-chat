//establish socket connection
const socket = io('http://localhost:3000')

//dom element variables
const userformInput = document.querySelector('.userform-input')
const userNameInput = document.querySelector('.username-input')
const joinScreen = document.querySelector('.join-screen')
const chatScreen = document.querySelector('.chat-screen')

userformInput.addEventListener('submit', (e) => {
    console.log('submit');
    e.preventDefault()
    const name = userNameInput.value
    socket.emit('name', name)
    userNameInput.value = ''
    joinScreen.classList.remove('active')
    chatScreen.classList.add('active')
})

socket.on('chatMessage', (data) => {
    appendMessage(data)
})

//function for appending the message
function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
    console.log(messageContainer.innerText)
}
