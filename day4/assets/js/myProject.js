const dataBlog = []; //parkiran

function addBlog(event) {
  event.preventDefault();

  const title = document.getElementById("input-project-name").value;
  const content = document.getElementById("input-project-desc").value;
  // const startdate = new Date(document.getElementById("startDate").value);
  // const endDate = new Date(document.getElementById("endDate").value);
  // const checkNode = document.getElementById("checkNode").checked;
  // const checkReact = document.getElementById("checkReact").checked;
  // const checkNext = document.getElementById("checkNext").checked;
  // const checkTypescript = document.getElementById("checkTypescript").checked;
  
  let image = document.getElementById("input-uploadImage").files;
  let imageURL = image ? URL.createObjectURL(image[0]) : ''; // Get image URL if uploaded

  const blog = {
    title,
    content,
    startdate,
    endDate,
    // checkNode,
    // checkReact,
    // checkNext,
    // checkTypescript,
    image: imageURL
  };

  dataBlog.push(blog);

  console.log(dataBlog);
  renderBlog();
}

function renderBlog() {
  let html = "";
  for (let i = 0; i < dataBlog.length; i++) {
    let durationMonths = durationMonthDate(dataBlog[i].startDate, dataBlog[i].endDate);
    document.getElementById("contents").innerHTML +=
        `<div class="container-content">
        <div class="container-profile">
            <img src="${dataBlog[i].image}" alt="">
            <h4>${dataBlog[i].title} </h4>
            <span id="totalMonth">durasi : ${durationMonths} bulan</span>
            <p>${dataBlog[i].content}</p>
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
  document.getElementById("contents").innerHTML = html;
}
function durationMonthDate(startDate, endDate) {
  let diffTime = Math.abs(endDate - startDate);
  let diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  return diffMonths;
}

renderBlog();