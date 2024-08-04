
function sendMail() {
    let inputName = document.getElementById('inputName').value
    let inputEmail = document.getElementById('inputEmail').value
    let inputNumber = document.getElementById('inputNumber').value
    let inputSubject = document.getElementById('inputSubject').value
    let message = document.getElementById('message').value
  
    if (inputName == "") {
      return alert("Nama must be filled");
    } else if (inputEmail == "") {
      return alert("Email must be filled");
    } else if (inputNumber == "") {
      return alert("Phone must be filled!");
    } else if (inputSubject == "") {
      return alert("inputSubject must be choosen!");
    } else if (message == "") {
      return alert("Message must be filled!")
    }
  
    let emailReceiver = "muhamadmufidbachri27@gmail.com";
    console.log(`Name : ${inputName}\nEmail: ${inputEmail}\nPhone: ${inputNumber}\nSubject: ${inputSubject}\nMessage: ${message}`)

    let a = document.createElement("a");
    a.href = `mailto:${emailReceiver}?Subject=${inputSubject}&body=Halo, nama saya, ${inputName} ${message}. Silahkan kirimkan pesan saya di nomor ${inputNumber}`;
    a.click();
  }
  