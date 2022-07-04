window.addEventListener("load", () => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  });
  
  // the Date Functionality
  
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyy = today.getFullYear();
  let hh = String(today.getHours()).padStart(2, "0");
  let min = String(today.getMinutes()).padStart(2, "0");
  
  let time = `${hh}:${min}`;
  today = `${dd}-${mm}-${yyy}`;
  let dateSpan = document.getElementById("dateSpan");
  
  dateSpan.innerHTML = `<strong>Date:</strong> ${today} |
   <strong>Time:</strong> ${time}`;
  
  let dateSpanMobile = document.getElementById("dateSpanMobile");
  dateSpanMobile.innerHTML = `<strong>Date:</strong> ${today} |
   <strong>Time:</strong> ${time}`;
  
  //All the lets in the house
  let taskName = document.getElementById("taskName");
  let assignedTo = document.getElementById("assignedTo");
  let form = document.getElementById("form");
  let setStatus = document.getElementById("setStatus");
  let errorElement = document.getElementById("errorMsg");
  let description = document.getElementById("description");
  var modal = document.getElementById("form");
  var btn = document.getElementById("myBtn");
  var span = document.getElementById("closebtn");
  let dueDate = document.getElementById("dueDate");
  let formDelete = document.getElementById("formDelete");
  let closebtnedit = document.getElementById("closebtnedit");
  let card1 = document.getElementsByClassName("card1");
  
  let modalOverlay = document.getElementById("modalOverlay");
  let mobileAddTaskBtn = document.getElementById("addTaskBtnMobile");
  
  //Click events
  
  for (let i = 0; i < card1.length; i++) {
      card1[i].addEventListener('click', ()=>{editTask()})
      }
      
      function editTask(){
          formDelete.style.display = 'block'
          modalOverlay.style.opacity = "0.3";
          modalOverlay.style.backgroundColor = "gray";
      };
  
  for (let i = 0; i < card1.length; i++) {
    card1.item(i).addEventListener("click", function () {
      formDelete.style.display = "block";
      modalOverlay.style.opacity = "0.3";
      modalOverlay.style.backgroundColor = "gray";
    });
  }
  btn.onclick = function () {
    modal.style.display = "block";
    modalOverlay.style.opacity = "0.3";
    modalOverlay.style.backgroundColor = "gray";
  };
  span.onclick = function () {
    modal.style.display = "none";
    modalOverlay.style.opacity = "1";
    modalOverlay.style.backgroundColor = "transparent";
  };
  closebtnedit.onclick = function () {
    formDelete.style.display = "none";
    modalOverlay.style.opacity = "1";
    modalOverlay.style.backgroundColor = "transparent";
  };
  mobileAddTaskBtn.onclick = function () {
    modal.style.display = "block";
    modalOverlay.style.opacity = "0.3";
    modalOverlay.style.backgroundColor = "gray";
  };
  
  let formValidated = false;
  
  //Validating the form fields
  form.addEventListener("submit", (e) => {
    let messages = [];
    if (taskName.value === "") {
      messages.push("Task Name is Required");
    }
  
    if (taskName.value.length < 8) {
      messages.push("Task Name must be longer than 8 characters");
    }
    if (assignedTo.value == "") {
      messages.push("Task must be assigned");
    }
    if (setStatus.value == "") {
      messages.push("Please set a status.");
    }
    if (dueDate.value === "") {
      messages.push("Please set a due date");
    }
    if (description.value.length < 20) {
      messages.push("Please write a description of at least 20 characters");
    }
    if (messages.length > 0) {
      e.preventDefault();
      errorElement.innerText = messages.join(". ");
    } else {
      console.log("hello");
      messages = [];
      errorElement.innerText = messages;
      return (formValidated = true);
    }
  });
  
  //Grey out past dates- making only future dates clickable
  dueDate.addEventListener("click", function () {
    let today = new Date();
    let dateToday = String(today.getDate()).padStart(2, "0");
    let monthToday = String(today.getMonth() + 1).padStart(2, "0");
    let yearToday = today.getFullYear();
    let minDate = `${yearToday}-${monthToday}-${dateToday}`;
    dueDate.min = minDate;
  });
  
  dueDate2.addEventListener("click", function () {
    let today = new Date();
    let dateToday = String(today.getDate()).padStart(2, "0");
    let monthToday = String(today.getMonth() + 1).padStart(2, "0");
    let yearToday = today.getFullYear();
    let minDate = `${yearToday}-${monthToday}-${dateToday}`;
    dueDate2.min = minDate;
  });
  
  //Begin Javascript for adding todo
 