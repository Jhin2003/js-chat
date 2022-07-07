//establish socket connection
const socket = io('http://localhost:3000')

//dom element variables
const container = document.querySelector('.container')
const userformInput = document.querySelector('.userform-input')
const userNameInput = document.querySelector('.username-input')
const joinScreen = document.querySelector('.join-screen')
const chatScreen = document.querySelector('.chat-screen')

userformInput.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = userNameInput.value
    if (name.length >= 4) {
        socket.emit('name', name)
        userNameInput.value = ''
        container.classList.add('chat-container')
        joinScreen.classList.remove('active')
        chatScreen.classList.add('active')
    }
    else {
        alert('Invalid name')
    }
})

socket.on('chatMessage', (data) => {
    appendMessage(data)
})

socket.on('users', (users) => {
    console.log(users)
})
//function for appending the message
function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
    console.log(messageContainer.innerText)
}
