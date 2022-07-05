let taskName = document.getElementById("taskName");
let description = document.getElementById("description");
let dueDate = document.getElementById("dueDate");
let formDelete = document.getElementById("formDelete");
let modalOverlay = document.getElementById("modalOverlay");
let taskNameEdit = document.getElementById("taskNameEdit");
let assignedToEdit = document.getElementById("assignedToEdit");
let dueDateEdit = document.getElementById("dueDateEdit");
let descriptionEdit = document.getElementById("descriptionEdit");
let setStatusEdit = document.getElementById("setStatusEdit");

//class constructor
class TaskManager {
  constructor(
    newTaskName,
    newAssignTo,
    newDueDate,
    newSelectStatus,
    newAddDescription,
    latestID
  ) {
    this.taskArray = [];
    this.newTaskName = newTaskName;
    this.newAssignTo = newAssignTo;
    this.newDueDate = newDueDate;
    this.newSelectStatus = newSelectStatus;
    this.newAddDescription = newAddDescription;
    this.id = latestID;
  }

  renderDone() {
    const newDiv = document.createElement("div");
    let card = `<div id="${this.id}">
      <span><img src="./Resources/greenbox.png" alt=""></span>
      <h3 class="cardTitle"> ${taskName.value} </h3> 
      <p class="taskDescriptionText"> ${description.value} </p>
      <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
      <hr> 
      <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p>
      </div>`
      
      console.log(card);
    cardsDone.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");
    newDiv.addEventListener("click", () => {
      editTask(this.id), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;

  }

  renderReview() {
    let card = ` <div id="${this.id}">
    <span><img src="./Resources/bluebox.png" alt=""></span>
              <h3 class="cardTitle"> ${taskName.value} </h3> 
              <p class="taskDescriptionText"> ${description.value} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
              <hr> 
              <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p></div>`;
              console.log(card);
              const newDiv = document.createElement("div");
    cardsReview.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");
    newDiv.addEventListener("click", () => {
      editTask(this.id), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;

  }

  renderToDo() {
    let card = `<div id="${this.id}">
    <span><img src="./Resources/redbox.png" alt=""></span>
              <h3 class="cardTitle"> ${taskName.value} </h3> 
              <p class="taskDescriptionText"> ${description.value} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
              <hr> 
              <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p></div>`;
              console.log(card);
              //this targets the specific 
              console.log(this.id);
              const newDiv = document.createElement("div");
    cardsToDo.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");
    newDiv.addEventListener("click", () => {
      editTask(this.id), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;

  }

  renderInProgress() {
    let card = `<div id="${this.id}">
    <span><img src="./Resources/yellowbox.png" alt=""></span>
  <h3 class="cardTitle"> ${taskName.value} </h3> 
  <p class="taskDescriptionText"> ${description.value} </p>
  <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
  <hr> 
  <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p></div>`;
  console.log(card);  
  const newDiv = document.createElement("div");
    cardsinProgress.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");
    newDiv.addEventListener("click", () => {
      editTask(this.id), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;

  }
};

let retrievedArray = [];
// function getAllTasks(){
//   return retrievedArray;
// }


for(let i=0; i < localStorage.length; i++) {
  let x = JSON.parse(localStorage.getItem(localStorage.key(i)));
retrievedArray.push(x)
}




function editTask(a) {
  formDelete.style.display = "block";
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
console.log(a);

  for (let i = 0; i < retrievedArray.length; i++) {
    //here is where we would put our condition if id
    let x = retrievedArray[i];
    console.log(x.id);
    if (x.id === a) 
    {
      taskNameEdit.value = x.newTaskName; //get existing here
      assignedToEdit.value = x.newAssignTo; //get existing here
      dueDateEdit.value = x.newDueDate;
      setStatusEdit.value = x.newSelectStatus;
      descriptionEdit.value = x.newAddDescription;
    } else {
      alert ('HI') 
    }
  }
}

console.log(retrievedArray)
export { TaskManager };
