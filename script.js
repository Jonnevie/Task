import {TaskManager} from './TaskManager.js';

window.addEventListener("load", () => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
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
  let ss = String(today.getSeconds()).padStart(2,"0");
  let dateSpan = document.getElementById("dateSpan");
  let time = `${hh}:${min}:${ss}`; 
  today = `${dd}-${mm}-${yyy}`;
  dateSpan.innerHTML = `<strong>Date:</strong> ${today} |
   <strong>Time:</strong> ${time}`;
  
  let dateSpanMobile = document.getElementById("dateSpanMobile");
  dateSpanMobile.innerHTML = `<strong>Date:</strong> ${today} |
   <strong>Time:</strong> ${time}`;
  } 

 setInterval(clockTick, 1000)

  
  
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
  

  

  
  //assigning lets
  
  let toDoItems = [];
  
  let inProgressItems = [];
  let reviewItems = [];
  let doneItems = [];
  let modalBtn = document.getElementById("modalBtn");
  let cardsToDo = document.getElementById("cardsToDo");
  let cardsinProgress = document.getElementById("cardsinProgress");
  let cardsReview = document.getElementById("cardsReview");
  let cardsDone = document.getElementById("cardsDone");
  
  /// extract information from input fields on submit button click
  
  function resetFormClearModal() {
      form.reset();
      modal.style.display = "none";
      modalOverlay.style.opacity = "1";
      modalOverlay.style.backgroundColor = "transparent";
      formValidated = false;
  
  }

  let latestId = [1];
  
function extractData() {
  
    let ourNewTask = new TaskManager(
      taskName.value,
      assignedTo.value,
      dueDate.value,
      setStatus.value,
      description.value,
      latestId.at(-1),
    );
  
  
    if (formValidated === true && setStatus.value === "modalToDo") {
      toDoItems.push(ourNewTask);
  
      let card = `<div class=newCard><span><img src="./Resources/redbox.png" alt=""></span>
              <h3> ${taskName.value} </h3> 
              <p class="taskDescriptionText"> ${description.value} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
              <hr> 
              <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p></div>`;
  
      function addNewCardDivToDo() {
        const newDiv = document.createElement("div");
        cardsToDo.insertAdjacentElement("beforeend", newDiv);
        newDiv.classList.add("card1");
        newDiv.addEventListener('click', ()=>{editTask(),window.scrollTo(0, 0)})
        newDiv.innerHTML = card;
      }
      addNewCardDivToDo();
      resetFormClearModal();
    }
    if (formValidated === true && setStatus.value === "modalInProgress") {
      inProgressItems.push(ourNewTask);
  
      let card = `<span><img src="./Resources/yellowbox.png" alt=""></span>
              <h3> ${taskName.value} </h3> 
              <p class="taskDescriptionText"> ${description.value} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
              <hr> 
              <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p>`;
  
      function addNewCardDivInProgress() {
        const newDiv = document.createElement("div");
        cardsinProgress.insertAdjacentElement("beforeend", newDiv);
        newDiv.classList.add("card1");
        newDiv.addEventListener('click', ()=>{editTask(),window.scrollTo(0, 0);})
        newDiv.innerHTML = card;
      }
      addNewCardDivInProgress();
      resetFormClearModal();
    }
    if (formValidated === true && setStatus.value === "modalReview") {
      reviewItems.push(ourNewTask);
  
      let card = `<span><img src="./Resources/bluebox.png" alt=""></span>
              <h3> ${taskName.value} </h3> 
              <p class="taskDescriptionText"> ${description.value} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
              <hr> 
              <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p>`;
  
      function addNewCardDivCardsReviews() {
        const newDiv = document.createElement("div");
        cardsReview.insertAdjacentElement("beforeend", newDiv);
        newDiv.classList.add("card1");
        newDiv.addEventListener('click', ()=>{editTask(),window.scrollTo(0, 0)})
        newDiv.innerHTML = card;
      }
      addNewCardDivCardsReviews();
      resetFormClearModal();
    }
    if (formValidated === true && setStatus.value === "modalDone") {
      doneItems.push(ourNewTask);
  
      let card = `<span><img src="./Resources/greenbox.png" alt=""></span>
              <h3> ${taskName.value} </h3> 
              <p class="taskDescriptionText"> ${description.value} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
              <hr> 
              <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p>`;
  
      function addNewCardDivcardsDone() {
        const newDiv = document.createElement("div");
        cardsDone.insertAdjacentElement("beforeend", newDiv);
        newDiv.classList.add("card1");
        newDiv.addEventListener('click', ()=>{editTask(),window.scrollTo(0, 0)})
        newDiv.innerHTML = card;
      }
      addNewCardDivcardsDone();
      resetFormClearModal();
    }
  function addToArray() {
  let x = latestId.at(-1);
  x++;
  latestId.push(x);
  }
  addToArray();

  console.log(ourNewTask);
  }



  ;
  





// Trying out local Storage ---


//       localStorage.setItem('New Task Name', taskName.value);
//       localStorage.setItem('New Assigned To', assignedTo.value);
//       localStorage.setItem('New Due Date', dueDate.value);
//       localStorage.setItem('New Status', setStatus.value);
//       localStorage.setItem('New Description', description.value);
//       localStorage.setItem('New ID', latestId.at(-1));
  
// localStorage.getItem(taskName.value);