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
          // Reset the form after sending the message
          document.getElementById("name").value = "";
          document.getElementById("mail").value = "";
          document.getElementById("text").value = "";
        } else {
          console.error("Error sending message:", xhr.status);
        }
      }
    };

    xhr.send(params);
  }