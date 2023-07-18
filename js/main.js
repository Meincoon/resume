$(document).ready(function() {
  const form = $('.form');
  const inputs = {
    name: $('#name'),
    email: $('#email'),
    message: $('#message')
  };
  const errors = {
    name: $('#nameError'),
    email: $('#emailError'),
    message: $('#messageError')
  };
  const chatid = "-1001846419942";
  const token = "6083469373:AAEuLYPNw0jV7hwJTmrErru-bTWzLY6jATU";
  form.on('submit', function(event) {
    event.preventDefault();
    resetBorders();
    const isValid = validateInputs();
    if (!isValid) return;
    const name = inputs.name.val();
    const email = inputs.email.val();
    const message = inputs.message.val();
    sendPravka(token, name, email, message, chatid);
    clearInputs();
  });
  function resetBorders() {
    Object.values(inputs).forEach(input => input.css('border-color', ''));
  }
  function validateInputs() {
    let isValid = true;
    Object.entries(inputs).forEach(([key, input]) => {
      const value = input.val().trim();
      if (value === '') {
        input.css('border-color', 'red');
        input.focus();
        isValid = false;
      } else if (key === 'email' && !isValidEmail(value)) {
        input.css('border-color', 'red');
        input.focus();
        isValid = false;
      }
    });
    return isValid;
  }
  function isValidEmail(email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  }
  function sendPravka(token, name, email, message, chatid) {
    $.ajax({
      url: `https://api.telegram.org/bot${token}/sendMessage`,
      type: 'POST',
      data: {
        chat_id: chatid,
        parse_mode: 'HTML',
        text: `<b>Name:</b> ${name}\n<b>Email:</b> ${email}\n<b>Message:</b> ${message}`
      },
      success: function() {
        console.log('Message sent successfully');
        resetBorders();
      },
      error: function(xhr) {
        console.error('Error sending message:', xhr.status);
      }
    });
  }
  function clearInputs() {
    Object.values(inputs).forEach(input => input.val(''));
  }
});
