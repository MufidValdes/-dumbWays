
function sendMail(event) {
  event.preventDefault()

    const inputName = document.getElementById('inputName').value
    const inputEmail = document.getElementById('inputEmail').value
    const inputNumber = document.getElementById('inputNumber').value
    const subject = document.getElementById('subject').value
    const message = document.getElementById('message').value
  
    if (inputName == "") {
      return alert("Nama must be filled");
    } else if (inputEmail == "") {
      return alert("Email must be filled");
    } else if (inputNumber == "") {
      return alert("Phone must be filled!");
    } else if (subject == "") {
      return alert("Subject must be choosen!");
    } else if (message == "") {
      return alert("Message must be filled!")
    }
    console.log(inputName)
    console.log(inputEmail)
    console.log(inputNumber)
    console.log(subject)
    console.log(message)

    let emailReceiver = "muhamadmufidbachri27@gmail.com";
  
    let a = document.createElement("a");
    a.href = `mailto:${emailReceiver}?subject=${subject}&body=Halo, nama saya, ${inputName} ${message}. Silahkan kirimkan pesan saya di nomor ${inputNumber}`;
    a.click();
  }
  