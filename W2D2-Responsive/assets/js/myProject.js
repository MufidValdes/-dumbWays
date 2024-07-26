let dataProject = []; 

function addProject(event) {
  event.preventDefault();

  let title = document.getElementById("input-project-name").value;
  let content = document.getElementById("input-project-desc").value;
  let startdate = new Date(document.getElementById("startDate").value);
  let endDate = new Date(document.getElementById("endDate").value);
  let checkNode = document.getElementById("checkNode").checked;
  let checkReact = document.getElementById("checkReact").checked;
  let checkNext = document.getElementById("checkNext").checked;
  let checkTypescript = document.getElementById("checkTypescript").checked;
  
  let image = document.getElementById("input-uploadImage").files;
  image = URL.createObjectURL(image[0]);


  function durationMonthDate(startDate,endDate) {
    let date = endDate - startDate;
  }
  let Project = {
    title,
    startdate,
    endDate,
    checkNode,
    checkReact,
    checkNext,
    checkTypescript,
    content: content,
  };

  dataProject.push(Project);

  console.log(dataProject);
  renderProject();
}

function renderProject() {
  document.getElementById("contents").innerHTML = "";

  for (let i = 0; i < dataProject.length; i++) {
    document.getElementById("contents").innerHTML +=
        `<div class="container-content">
        <div class="container-profile">
            <img src="${dataProject[i].image}" alt="">
            <h4>${dataProject[i].title} </h4>
            <span id="totalMonth">durasi : 3 bulan</span>
            <p>${dataProject[i].content}</p>
        </div>
        <div class="container-logo">
          <i class="fa-brands fa-google-play fa-xl"></i>
          <i class="fa-brands fa-android fa-xl"></i>
          <i class="fa-brands fa-java fa-xl"></i>
        </div>
        <div class="container-button">
            <button class="edit-button">edit</button>
            <button class="delete-button">delete</button>
        </div>
    </div>`;
  }
}
