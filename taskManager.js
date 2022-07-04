
  let latestId = [1];
  
  //class constructor
  class NewTask {
    constructor(
      newTaskName,
      newAssignTo,
      newDueDate,
      newSelectStatus,
      newAddDescription,
      latestId,
    ) {
      this.newTaskName = newTaskName;
      this.newAssignTo = newAssignTo;
      this.newDueDate = newDueDate;
      this.newSelectStatus = newSelectStatus;
      this.newAddDescription = newAddDescription;
      this.latestId = latestId;
    };
  
  
  
    
  }
  
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
  
  form.addEventListener("submit", function extractData() {
  
    let ourNewTask = new NewTask(
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
  }
  );
  