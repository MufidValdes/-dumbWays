let dataProject = []; 

function addProject(event) {
  event.preventDefault();

  let inputTitle = document.getElementById("input-project-name").value;
  let inputContent = document.getElementById("input-project-desc").value;
  // let startdate = new Date(document.getElementById("startDate").value);
  // let endDate = new Date(document.getElementById("endDate").value);
  // let checkNode = document.getElementById("checkNode").checked;
  // let checkReact = document.getElementById("checkReact").checked;
  // let checkNext = document.getElementById("checkNext").checked;
  // let checkTypescript = document.getElementById("checkTypescript").checked;
  
  console.log("title", inputTitle)
  console.log("content", inputContent)


  let InputImage = document.getElementById("input-uploadImage").files;
  imageURL = URL.createObjectURL(InputImage[0]);

  console.log("image", imageURL)

  const Project = {
    title : inputTitle,
    content: inputContent,
    image: imageURL,
    checkNode : true,
    checkReact : false,
    checkNext : false,
    checkTypescript :true,
  };

  dataProject.push(Project);

  console.log("dataProject", dataProject);
  renderProject();
}

function renderProject() {
  document.getElementById("contents").innerHTML = '';

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
          <i class="${dataProject[i].checkReact}"></i>
          <i class="${dataProject[i].checkNext}"></i>
          <i class="${dataProject[i].checkNode}"></i>
        </div>
        <div class="container-button">
            <button class="edit-button">edit</button>
            <button class="delete-button">delete</button>
        </div>
    </div>`;
  }
}

setInterval(function() {
  renderProject()
}, 1000)