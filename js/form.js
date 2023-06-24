const form = document.querySelector('.form_one');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const messageInput = document.getElementById('text');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
form.addEventListener('submit', function(event) {
  nameInput.style.borderTop = '1px solid black';
  nameInput.style.borderBottom = '1px solid black';
  emailInput.style.borderTop = '1px solid black';
  emailInput.style.borderBottom = '1px solid black';
  messageInput.style.borderTop = '1px solid black';
  messageInput.style.borderBottom = '1px solid black';
  event.preventDefault();
  if (nameInput.value.trim() === '') {
    nameInput.style.borderTop = '1px solid red';
    nameInput.style.borderBottom = '1px solid red';
    nameInput.focus();
    return;
  }
  const email = emailInput.value.trim();
  if (email === '') {
    emailInput.style.borderTop = '1px solid red';
    emailInput.style.borderBottom = '1px solid red';
    emailInput.focus();
    return;
  } else if (!isValidEmail(email)) {
    emailInput.style.borderTop = '1px solid red';
    emailInput.style.borderBottom = '1px solid red';
    emailInput.focus();
    return;
  }
  if (messageInput.value.trim() === '') {
    messageInput.style.borderTop = '1px solid red';
    messageInput.style.borderBottom = '1px solid red';
    messageInput.focus();
    return;
  }
  sendMessage();
});
function isValidEmail(email) {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}
function sendMessage() {
    var chatid = "-1001846419942";
    var token = "6083469373:AAEuLYPNw0jV7hwJTmrErru-bTWzLY6jATU";
    var name = document.getElementById("name").value;
    var mail = document.getElementById("mail").value;
    var text = document.getElementById("text").value;
    sendPravka(token, name, mail, text, chatid);
    return false;
  }
  function sendPravka(token, name, mail, text, chatid) {
    var xhr = new XMLHttpRequest();
    var url = "https://api.telegram.org/bot" + token + "/sendMessage";
    var params = "chat_id=" + chatid + "&parse_mode=HTML&text=" + encodeURIComponent("<b>Name:</b> " + name + "\n<b>Mail:</b> " + mail + "\n<b>Text:</b> " + text);
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Message sent successfully");
          document.getElementById("name").value = "";
          document.getElementById("mail").value = "";
          document.getElementById("text").value = "";
          nameInput.style.borderTop = '1px solid black';
          nameInput.style.borderBottom = '1px solid black';
          emailInput.style.borderTop = '1px solid black';
          emailInput.style.borderBottom = '1px solid black';
          messageInput.style.borderTop = '1px solid black';
          messageInput.style.borderBottom = '1px solid black';
        } else {
          console.error("Error sending message:", xhr.status);
        }
      }
    };
    xhr.send(params);
  }