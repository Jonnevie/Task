import { TaskManager } from "./TaskManager.js";

let latestID = 0;
const firstObject = { id: 0, message: "This is just a placeholder" };

window.addEventListener("load", () => {
  localStorage.setItem(0, JSON.stringify(firstObject));
  populateArray();
  populateIDArray();
  renderRetrievedTasks();
  form.addEventListener("submit", (e) => {
    // e.preventDefault();
    extractData();
  });
});

// the Date and Time Functionality

function clockTick() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyy = today.getFullYear();
  let hh = String(today.getHours()).padStart(2, "0");
  let min = String(today.getMinutes()).padStart(2, "0");
  let ss = String(today.getSeconds()).padStart(2, "0");
  let dateSpan = document.getElementById("dateSpan");
  let time = `${hh}:${min}:${ss}`;
  today = `${dd}-${mm}-${yyy}`;
  dateSpan.innerHTML = `<strong>Date:</strong> ${today} |
   <strong>Time:</strong> ${time}`;

  let dateSpanMobile = document.getElementById("dateSpanMobile");
  dateSpanMobile.innerHTML = `<strong>Date:</strong> ${today} |
   <strong>Time:</strong> ${time}`;
}

setInterval(clockTick, 1000);

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
let cardsToDo = document.getElementById("cardsToDo");
let cardsinProgress = document.getElementById("cardsinProgress");
let cardsReview = document.getElementById("cardsReview");
let cardsDone = document.getElementById("cardsDone");
let modalOverlay = document.getElementById("modalOverlay");
let mobileAddTaskBtn = document.getElementById("addTaskBtnMobile");
let modalBtnDone = document.getElementById("modalBtnDone");
let taskNameEdit = document.getElementById("taskNameEdit");
let assignedToEdit = document.getElementById("assignedToEdit");
let dueDateEdit = document.getElementById("dueDateEdit");
let descriptionEdit = document.getElementById("descriptionEdit");
let setStatusEdit = document.getElementById("setStatusEdit");
let modalBtnDel = document.getElementById("modalBtnDel");
let uniqueID = document.getElementById("uniqueID");
let modalEditBtnSubmit = document.getElementById("modalEditBtnSubmit");

//Click events
btn.onclick = function () {
  modal.style.display = "block";
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
};
span.onclick = function () {
  modal.style.display = "none";
  modalOverlay.style.opacity = "1";
  modalOverlay.style.backgroundColor = "transparent";
  resetFormClearModal();
};
closebtnedit.onclick = function () {
  formDelete.style.display = "none";
  modalOverlay.style.opacity = "1";
  modalOverlay.style.backgroundColor = "transparent";
  underModal.style.pointerEvents = 'auto';
};
mobileAddTaskBtn.onclick = function () {
  modal.style.display = "block";
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
};

//Validating the form fields

let formValidated = false;
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

function resetFormClearModal() {
  // form.reset();
  modal.style.display = "none";
  modalOverlay.style.opacity = "1";
  modalOverlay.style.backgroundColor = "transparent";
  formValidated = false;
}
const retrievedArray = [];
// function getAllTasks(){
//   return retrievedArray;
// }

function populateArray() {
  for (let i = 0; i < localStorage.length; i++) {
    let x = JSON.parse(localStorage.getItem(localStorage.key(i)));
    // console.log(x);
    if (typeof x == "object") {
      retrievedArray.push(x);
    }
    // console.log(retrievedArray)
  }
}
console.log(retrievedArray);

function populateIDArray() {
  const idArray = retrievedArray.map((obj) => {
    return obj.id;
  });
  console.log(idArray);
  latestID = Math.max(...idArray);
  console.log(latestID);
  localStorage.setItem("latestID", latestID);
}



function extractData() {
  let ourNewTask = new TaskManager(
    taskName.value,
    assignedTo.value,
    dueDate.value,
    setStatus.value,
    description.value,
    latestID + 1,
    // assignedToURL
  );


  function storeData() {
    localStorage.setItem(ourNewTask.id, JSON.stringify(ourNewTask));
  }

  if (formValidated === true && setStatus.value === "modalToDo") {
    storeData();
    ourNewTask.renderToDo();
    resetFormClearModal();
  }

  if (formValidated === true && setStatus.value === "modalInProgress") {
    storeData();
    ourNewTask.renderInProgress();
    resetFormClearModal();
  }

  if (formValidated === true && setStatus.value === "modalReview") {
    storeData();
    ourNewTask.renderReview();
    resetFormClearModal();
  }

  if (formValidated === true && setStatus.value === "modalDone") {
    storeData();
    ourNewTask.renderDone();
    resetFormClearModal();
  }
}
let underModal = document.getElementById('underModal');
function editTasks(a) {

  
  formDelete.style.display = "block";
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
  uniqueID.style.display = "none";
  underModal.style.pointerEvents = 'none';

  taskNameEdit.value = a.newTaskName; //get existing here
  assignedToEdit.value = a.newAssignTo; //get existing here
  dueDateEdit.value = a.newDueDate;
  setStatusEdit.value = a.newSelectStatus;
  descriptionEdit.value = a.newAddDescription;
  uniqueID.value = a.id;

  if( setStatusEdit.value == "modalDone"){
    modalBtnDone.style.display = 'none';
  }

  modalBtnDel.addEventListener("click", () => {
    localStorage.removeItem(a.id);
    document.getElementById(a.id).style.display = "none";
    formDelete.style.display = "none";
    modalOverlay.style.opacity = "1";
    modalOverlay.style.backgroundColor = "transparent";
    underModal.style.pointerEvents = 'auto';
    resetFormClearModal();
  });

  modalEditBtnSubmit.addEventListener("click", () => {
    formDelete.style.display = "none";
    modalOverlay.style.opacity = "1";
    modalOverlay.style.backgroundColor = "transparent";
    a.newTaskName = taskNameEdit.value;
    a.newAssignTo = assignedToEdit.value;
    a.newDueDate = dueDateEdit.value;
    a.newSelectStatus = setStatusEdit.value;
    a.newAddDescription = descriptionEdit.value;
    localStorage.setItem(a.id, JSON.stringify(a));
    underModal.style.pointerEvents = 'auto';
    location.reload(true);
    resetFormClearModal();
  });

  modalBtnDone.addEventListener('click', function() {
    formDelete.style.display = "none";
    modalOverlay.style.opacity = "1";
    modalOverlay.style.backgroundColor = "transparent";
    console.log(a.newSelectStatus);
    a.newSelectStatus = setStatus.value = "modalDone";
    localStorage.setItem(a.id , JSON.stringify(a));
    underModal.style.pointerEvents = 'auto';
    location.reload();
    resetFormClearModal();
  })
}







function renderRetrievedTasks() {

  let assignedToURL = "";
  function choosePhoto(x){
    if (x.newAssignTo == "Jonnevie"){
   assignedToURL = "./Resources/ProfileUser4.png"
  } else if (x.newAssignTo == "Seb") {
     assignedToURL = "https://ca.slack-edge.com/T03D1A9UA0H-U03E4V01JEM-114cbebd95cd-512"
  } else if (x.newAssignTo == "Betty") {
     assignedToURL = "https://ca.slack-edge.com/T03D1A9UA0H-U03DULNBNLC-302a1f76a262-512"
  } else if (x.newAssignTo == "Pooja") {
     assignedToURL = "https://ca.slack-edge.com/T03D1A9UA0H-U03DULNH4N8-g6931de90907-512"
  } else if (x.newAssignTo =="Justin") {
    assignedToURL = "https://ca.slack-edge.com/T03D1A9UA0H-U03CTQHF37X-307d1f8dc23f-512"
  } else {
    console.log('user doesnt exist')
  }
  }

  for (let i = 0; i < retrievedArray.length; i++) {
    // console.log(retrievedArray[i]);
    let x = retrievedArray[i];
    choosePhoto(x);
    if (x.newSelectStatus === "modalReview") {
      let card = `<div id="${x.id}"><span><img src="./Resources/bluebox.png" alt=""></span>
                <h3> ${x.newTaskName} </h3> 
                <p class="taskDescriptionText"> ${x.newAddDescription} </p>
                <img class= "profileCard" src=${assignedToURL}> 
                <hr> 
                <p class="dueDateText"><strong>DUE:</strong><span>${x.newDueDate}</span></p></div>`;
      const newDiv = document.createElement("div");
      cardsReview.insertAdjacentElement("beforeend", newDiv);
      newDiv.classList.add("card1");

      newDiv.addEventListener("click", () => {
        editTasks(x), window.scrollTo(0, 0);
      });

      newDiv.innerHTML = card;
    } else if (x.newSelectStatus === "modalToDo") {
      let card = `<div id="${x.id}"><span><img src="./Resources/redbox.png" alt=""></span>
                <h3> ${x.newTaskName} </h3> 
                <p class="taskDescriptionText"> ${x.newAddDescription} </p>
                <img class= "profileCard" src=${assignedToURL}> 
                <hr> 
                <p class="dueDateText"><strong>DUE:</strong><span>${x.newDueDate}</span></p> </div>`;
      const newDiv = document.createElement("div");
      cardsToDo.insertAdjacentElement("beforeend", newDiv);
      newDiv.classList.add("card1");
      newDiv.addEventListener("click", () => {
        editTasks(x), window.scrollTo(0, 0);
      });
      newDiv.innerHTML = card;
    } else if (x.newSelectStatus === "modalDone") {
      let card = `<div id="${x.id}"><span><img src="./Resources/greenbox.png" alt=""></span>
                <h3> ${x.newTaskName} </h3> 
                <p class="taskDescriptionText"> ${x.newAddDescription} </p>
                <img class= "profileCard" src=${assignedToURL}> 
                <hr> 
                <p class="dueDateText"><strong>DUE:</strong><span>${x.newDueDate}</span></p></div>`;
      const newDiv = document.createElement("div");
      cardsDone.insertAdjacentElement("beforeend", newDiv);
      newDiv.classList.add("card1");
      newDiv.addEventListener("click", () => {
        editTasks(x), window.scrollTo(0, 0);
      });
      newDiv.innerHTML = card;
    } else if (x.newSelectStatus === "modalInProgress") {
      let card = `<div id="${x.id}"><span><img src="./Resources/yellowbox.png" alt=""></span>
                <h3> ${x.newTaskName} </h3> 
                <p class="taskDescriptionText"> ${x.newAddDescription} </p>
                <img class= "profileCard" src=${assignedToURL}> 
                <hr> 
                <p class="dueDateText"><strong>DUE:</strong><span>${x.newDueDate}</span></p></div>`;
      const newDiv = document.createElement("div");
      cardsinProgress.insertAdjacentElement("beforeend", newDiv);
      newDiv.classList.add("card1");
      newDiv.addEventListener("click", () => {
        editTasks(x), window.scrollTo(0, 0);
      });
      newDiv.innerHTML = card;
    }
  }
}
