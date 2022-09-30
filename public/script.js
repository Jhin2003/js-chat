//establish socket connection
const socket = io("http://localhost:3000");

//dom element variables
const container = document.querySelector(".container");
const userformInput = document.querySelector(".userform-input");
const userNameInput = document.querySelector(".username-input");
const joinScreen = document.querySelector(".join-screen");
const chatScreen = document.querySelector(".chat-screen");
const onlineUsers = document.querySelector(".chat-right-side");
const chat = document.querySelector(".chat-form");
const chatInput = document.querySelector(".chat-input");

userformInput.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = userNameInput.value;
  if (name.length >= 4) {
    socket.emit("name", name);
    userNameInput.value = "";
    container.classList.add("chat-container");
    joinScreen.classList.remove("active");
    chatScreen.classList.add("active");
  } else {
    alert("name must  atleast cointain 4 characthers");
  }
});

chat.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = chatInput.value;
  socket.emit("inputMessage", message);
  chatInput.value = "";
});

socket.on("chatMessage", (message) => {});

socket.on("users", (users) => {
  showOnlineUsers(users);
});

//function for appending the message
function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
  console.log(messageContainer.innerText);
}

//function for showing online users
function showOnlineUsers(message) {
  //delete users that left
  while (onlineUsers.hasChildNodes()) {
    onlineUsers.removeChild(onlineUsers.firstChild);
  }
  //add users that joined
  let onlineUsersList = Object.values(message);
  onlineUsersList.forEach((user) => {
    let displayOnlineUser = document.createElement("div");
    displayOnlineUser.innerText = user;
    onlineUsers.append(displayOnlineUser);
  });
}
