let taskName = document.getElementById("taskName");
let description = document.getElementById("description");
let dueDate = document.getElementById("dueDate");
let formDelete = document.getElementById("formDelete");
let modalOverlay = document.getElementById("modalOverlay");

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
      editTask(), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;
    return newDiv;
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
      editTask(), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;
    return newDiv;
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
              const newDiv = document.createElement("div");
    cardsToDo.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");
    newDiv.addEventListener("click", () => {
      editTask(), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;
    return newDiv;
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
      editTask(), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;
    return newDiv;
  }
  // getAllTasks() {
  //   return this.retrievedArray
  // }

  // renderRetrievedTasks() {
  //   for(i=0; i < retrievedArray.length; i++){
  //     retrievedArray(i);
  //     console.log(retrievedArray)
  // }
};



function editTask() {
  formDelete.style.display = "block";
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
}

export { TaskManager };
