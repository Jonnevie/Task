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
let modalBtnDel = document.getElementById('modalBtnDel')
let uniqueID = document.getElementById('uniqueID');
let modalEditBtnSubmit = document.getElementById('modalEditBtnSubmit');

//class constructor
class TaskManager {
  constructor(
    newTaskName,
    newAssignTo, 
    newDueDate,
    newSelectStatus,
    newAddDescription,
    latestID,
    newAssignToURL
  ) {
    this.newTaskName = newTaskName;
    this.newAssignTo = newAssignTo;
    this.newDueDate = newDueDate;
    this.newSelectStatus = newSelectStatus;
    this.newAddDescription = newAddDescription;
    this.id = latestID;    
    this.assignedToURL = newAssignToURL;
  }

  //this is the render method for the tasks marked 'done'
  renderDone() {
    const newDiv = document.createElement("div");  //creating a new div
    let card = `<div id="${this.id}">           
      <span><img src="./Resources/greenbox.png" alt=""></span>
      <h3 class="cardTitle"> ${taskName.value} </h3> 
      <p class="taskDescriptionText"> ${description.value} </p>
      <img class= "profileCard" src=${this.assignedToURL}> 
      <hr> 
      <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p>
      </div>`       //this is the innerHTML of a new task, which will be styled with the 'done' styling, green box, etc.
      console.log(card);
    cardsDone.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");  //this adds the class of "card1" to the     newly created div
    newDiv.addEventListener("click", () => {
      editTask(this.id), window.scrollTo(0, 0);
    });  // this event listener allows my edit modal to pop up to the rendered tasks. If this was placed outside of this method, it would not apply to the newly rendered task.
    storeData();  //this is the function that stores the object to local storage.
    newDiv.innerHTML = card;  //writing the innerHTML as above defined : card.
  }

  renderReview() {
    let card = ` <div id="${this.id}">
    <span><img src="./Resources/bluebox.png" alt=""></span>
              <h3 class="cardTitle"> ${taskName.value} </h3> 
              <p class="taskDescriptionText"> ${description.value} </p>
              <img class= "profileCard" src=${this.assignedToURL}> 
              <hr> 
              <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p></div>`;
              console.log(card);
              const newDiv = document.createElement("div");
    cardsReview.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");
    newDiv.addEventListener("click", () => {
      editTask(this.id), window.scrollTo(0, 0);
    });
    storeData();
    newDiv.innerHTML = card;



  }

  renderToDo() {
    let card = `<div id="${this.id}">
    <span><img src="./Resources/redbox.png" alt=""></span>
              <h3 class="cardTitle"> ${taskName.value} </h3> 
              <p class="taskDescriptionText"> ${description.value} </p>
              <img class= "profileCard" src=${this.assignedToURL}> 
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
    storeData();
    newDiv.innerHTML = card;
 


  }

  renderInProgress() {
    let card = `<div id="${this.id}">
    <span><img src="./Resources/yellowbox.png" alt=""></span>
  <h3 class="cardTitle"> ${taskName.value} </h3> 
  <p class="taskDescriptionText"> ${description.value} </p>
  <img class= "profileCard" src=${this.assignedToURL}> 
  <hr> 
  <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p></div>`;
  console.log(card);  
  const newDiv = document.createElement("div");
    cardsinProgress.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");
    newDiv.addEventListener("click", () => {
      editTask(this.id), window.scrollTo(0, 0);
    });
    storeData();
    newDiv.innerHTML = card;
    


  }
};

let retrievedArray = [];

//this is the function to store the newly created object from the extractData() function into local storage, with the key as the object string, and the value as the stringified version of the object.
function storeData(){ 
  localStorage.setItem(ourNewTask.id, JSON.stringify(ourNewTask));
}

for(let i=0; i < localStorage.length; i++) {
  console.log(localStorage.key(i));
  let x = JSON.parse(localStorage.getItem(localStorage.key(i)));
retrievedArray.push(x)
}




function editTask(a) {

  formDelete.style.display = "block";
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
  uniqueID.style.display = 'none';
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
      uniqueID.value = x.id;
    } 

  }
modalBtnDel.addEventListener("click", () => {
  formDelete.style.display = "none";
  modalOverlay.style.opacity = "1";
  modalOverlay.style.backgroundColor = "transparent";

  for (let i = 0; i < retrievedArray.length; i++) {
    let x = retrievedArray[i];
    // console.log(x.id);
    // console.log(taskNameEdit.value);
    // console.log(taskNameEdit.value);
    console.log(x.id)
    if (x.id == uniqueID.value) {
    localStorage.removeItem(x.id);
    document.getElementById(`${x.id}`).style.display = "none";
    resetFormClearModal();
    // window.location.reload();
    console.log('hello')
    } 
  }

 
});

modalEditBtnSubmit.addEventListener('click', () => {
  formDelete.style.display = "none";
  modalOverlay.style.opacity = "1";
  modalOverlay.style.backgroundColor = "transparent";

  for (let i = 0; i < retrievedArray.length; i++) {
    let x = retrievedArray[i];
    console.log(x.newTaskName)
    if(x.id ===uniqueID.value) {
      x.newTaskName = taskNameEdit.value; 
      x.newAssignTo = assignedToEdit.value; 
      dueDateEdit.value = x.newDueDate;
      setStatusEdit.value = x.newSelectStatus;
      descriptionEdit.value = x.newAddDescription;
      uniqueID.value = x.id;
    }
    

  }
})



}


// console.log(retrievedArray)
export { TaskManager };