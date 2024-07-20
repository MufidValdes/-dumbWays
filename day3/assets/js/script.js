
function sendEmail() {

    let inputName = document.getElementById('inputName').value
    let inputEmail = document.getElementById('inputEmail').value
    let inputNumber = document.getElementById('inputNumber').value
    let subject = document.getElementById('subject').value
    let message = document.getElementById('message').value


   let send = "mailto:muhamadmufidbachri27@gmail.com" + "?subject=" + 
   encodeURIComponent(subject) + " Halo nama saya adalah " + 
   encodeURIComponent(inputName) + "&body=" + "Let me introduce myself: " + "I'm " + 
   encodeURIComponent(inputName) + "  My email  " + 
   encodeURIComponent(inputEmail) + "  My phone number " + 
   encodeURIComponent(inputNumber) +"my message " + 
   encodeURIComponent(message);


    window.location.href = send
}
