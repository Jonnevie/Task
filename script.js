import { TaskManager } from "./TaskManager.js";

let latestID = 0;
//we needed a firstObject, because of the way increment ID works.
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

// the Date and Time Functionality, setting the time and date to display in
// a human readable format, and to refresh every 1 second.

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

//All the lets in the house, i know this is not ideal, should refrain from using global scope when you can :)
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

//this opens the modal
btn.onclick = function () {
  modal.style.display = "block";
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
};

//this closes the modal
span.onclick = function () {
  modal.style.display = "none";
  modalOverlay.style.opacity = "1";
  modalOverlay.style.backgroundColor = "transparent";
  resetFormClearModal();
};

//this closes the edit modal
closebtnedit.onclick = function () {
  formDelete.style.display = "none";
  modalOverlay.style.opacity = "1";
  modalOverlay.style.backgroundColor = "transparent";
  underModal.style.pointerEvents = 'auto';
  resetFormClearModal();
};

//this opens the add task modal on mobile
mobileAddTaskBtn.onclick = function () {
  modal.style.display = "block";
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
};

//Validating the form fields
//start out the form as NOT being validated.
let formValidated = false;
form.addEventListener("submit", (e) => {
  let messages = [];      // this array will show the pushed messages if there is an error
  if (taskName.value === "") {    //if the task name has no value,
    messages.push("Task Name is Required"); //push this message to array
  }
  if (taskName.value.length < 8) {    //if task name is too short.
    messages.push("Task Name must be longer than 8 characters");
  }
  if (assignedTo.value == "") {     //if task is not assigned.
    messages.push("Task must be assigned");
  }
  if (setStatus.value == "") {    //if status is not set.
    messages.push("Please set a status.");
  }
  if (dueDate.value === "") {
    messages.push("Please set a due date");
  }
  if (description.value.length < 20) {
    messages.push("Please write a description of at least 20 characters");
  }
  if (messages.length > 0) {
    e.preventDefault();   //this prevents the submit button from submitting if there is an error message.
    errorElement.innerText = messages.join(". "); //this joins the messages with a '.'
  } else {
    messages = [];
    errorElement.innerText = messages;
    return (formValidated = true); //this is when there are no error messages
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


//this function resets and closes the modal, and returns the formValidated = false.
function resetFormClearModal() {
  // form.reset();
  modal.style.display = "none";
  modalOverlay.style.opacity = "1";
  modalOverlay.style.backgroundColor = "transparent";
  location.reload();
  formValidated = false;
}

//this is where the local storage objects get stored when we retrieve them
const retrievedArray = [];

//this is a function to get all the local stored tasks into the retrieved array, its called on page load.
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
// console.log(retrievedArray);


//this function looks at the latest id, and finds the biggest number.
function populateIDArray() {
  const idArray = retrievedArray.map((obj) => {
    return obj.id;
  });
  // console.log(idArray);
  latestID = Math.max(...idArray); //this function finds the largest number in the idArray.
  console.log(latestID);
  localStorage.setItem("latestID", latestID);  //this sets a new object in local storage, key: latestID, and value: the max latest id
}


//on form validattion, this function takes the data, and makes it into a new 
// TaskManager object using the TaskManager Class, and the input values from the form
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

//this stores the data into local Storage
  function storeData() {
    localStorage.setItem(ourNewTask.id, JSON.stringify(ourNewTask));
  }

  //these if statements allow the form to be submitted and then stored based on if it has been validated and then 
  // renders the card based on the setStatus value. Each Set Status value will render in a different column.

  if (formValidated === true && setStatus.value === "modalToDo") {
    storeData();
    ourNewTask.renderToDo(); // renders in the To Do section, using the class method of "renderToDo"
    resetFormClearModal();  //after each successful card render, the modal is closed and reset.
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

//defining the underModal (evident when modal is opened) - background will become not clickable, and faded out.
let underModal = document.getElementById('underModal');


function editTasks(a) {
  formDelete.style.display = "block";  //these settings opens the edit modal
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
  uniqueID.style.display = "none";  //hides my hidden ID value to the modal
  underModal.style.pointerEvents = 'none'; //makes undermodal not clickable.

  taskNameEdit.value = a.newTaskName; //get existing info of the task to populate the edit modal , where "a" is the
  assignedToEdit.value = a.newAssignTo; //object that gets passed into the function.
  dueDateEdit.value = a.newDueDate;
  setStatusEdit.value = a.newSelectStatus;
  descriptionEdit.value = a.newAddDescription;
  uniqueID.value = a.id;

  if( setStatusEdit.value == "modalDone"){
    modalBtnDone.style.display = 'none';  //this makes the 'mark as done' button disappear for all the tasks with 
  }                                       //setStatus value as 'modalDone'.

  modalBtnDel.addEventListener("click", () => {  //this event listener removes the local storage item.
    localStorage.removeItem(a.id);
    document.getElementById(a.id).style.display = "none";
    formDelete.style.display = "none";
    modalOverlay.style.opacity = "1";
    modalOverlay.style.backgroundColor = "transparent";
    underModal.style.pointerEvents = 'auto';
    resetFormClearModal();
  });

  modalEditBtnSubmit.addEventListener("click", () => {  //this event listener edits the local storage item to whatever the user changes the form fields to
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
  });

  //this function sets the close button to work on the modal.
  closebtnedit.onclick = function () {
    formDelete.style.display = "none";
    modalOverlay.style.opacity = "1";
    modalOverlay.style.backgroundColor = "transparent";
    underModal.style.pointerEvents = 'auto';
    resetFormClearModal();
  };
}




function renderRetrievedTasks() {


  //this allows the picture to change based on the task's "assignedTo" value.
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
//this section renders the tasks retrieved from local storage based on the status of task.
  for (let i = 0; i < retrievedArray.length; i++) {
    // console.log(retrievedArray[i]);
    let x = retrievedArray[i];  //loops through the retrieved tasks, to get task.
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
