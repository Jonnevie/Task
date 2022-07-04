

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
  ) {
    this.taskArray = [];
    this.id = TaskManager.incrementId();
    this.newTaskName = newTaskName;
    this.newAssignTo = newAssignTo;
    this.newDueDate = newDueDate;
    this.newSelectStatus = newSelectStatus;
    this.newAddDescription = newAddDescription;
    this.addTask();
    
  }

  render(card, element){
    const newDiv = document.createElement("div");
    function editTask(){
      formDelete.style.display = 'block'
      modalOverlay.style.opacity = "0.3";
      modalOverlay.style.backgroundColor = "gray";
    };
    element.insertAdjacentElement("beforeend", newDiv);
    newDiv.classList.add("card1");
    newDiv.addEventListener("click", () => {
      editTask(), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;
    return newDiv;
  }

  static incrementId() {
    if (!this.latestId) {
        this.latestId = 1;
    } else {
        this.latestId++;
    }
    return this.latestId;
}

  addTask(){
    this.taskArray.push(this)
  }

}

export { TaskManager };