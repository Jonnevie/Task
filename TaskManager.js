//class constructor
class TaskManager {
  constructor(
    newTaskName,
    newAssignTo,
    newDueDate,
    newSelectStatus,
    newAddDescription,
    latestId
  ) {
    this.newTaskName = newTaskName;
    this.newAssignTo = newAssignTo;
    this.newDueDate = newDueDate;
    this.newSelectStatus = newSelectStatus;
    this.newAddDescription = newAddDescription;
    this.latestId = latestId;
  }

  renderDone() {
    const newDiv = document.createElement("div");
    let card = `<span><img src="./Resources/greenbox.png" alt=""></span>
      <h3> ${taskName.value} </h3> 
      <p class="taskDescriptionText"> ${description.value} </p>
      <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
      <hr> 
      <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p>`;
    cardsDone.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");
    newDiv.addEventListener("click", () => {
      editTask(), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;
    return newDiv;
  }

  renderReview() {
    let card = `<span><img src="./Resources/bluebox.png" alt=""></span>
              <h3> ${taskName.value} </h3> 
              <p class="taskDescriptionText"> ${description.value} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
              <hr> 
              <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p>`;
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
    let card = `<div class=newCard><span><img src="./Resources/redbox.png" alt=""></span>
              <h3> ${taskName.value} </h3> 
              <p class="taskDescriptionText"> ${description.value} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
              <hr> 
              <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p></div>`;
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
    let card = `<span><img src="./Resources/yellowbox.png" alt=""></span>
  <h3> ${taskName.value} </h3> 
  <p class="taskDescriptionText"> ${description.value} </p>
  <img class= "profileCard" src="./Resources/ProfileUser1.png"> 
  <hr> 
  <p class="dueDateText"><strong>DUE:</strong><span>${dueDate.value}</span></p>`;
    const newDiv = document.createElement("div");
    cardsinProgress.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");
    newDiv.addEventListener("click", () => {
      editTask(), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;
    return newDiv;
  }
}

function editTask() {
  formDelete.style.display = 'block'
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
};

export { TaskManager };
