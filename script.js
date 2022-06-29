// the Date Functionality

let today = new Date();
let dd = String(today.getDate()).padStart(2,'0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyy = today.getFullYear();
let hh= String(today.getHours()).padStart(2,'0');
let min = String(today.getMinutes()).padStart(2,'0');


let time = `${hh}:${min}`;
today = `${dd}-${mm}-${yyy}`;
let dateSpan = document.getElementById('dateSpan');


dateSpan.innerHTML= `<strong>Date:</strong> ${today} |
 <strong>Time:</strong> ${time}`;

 let dateSpanMobile = document.getElementById('dateSpanMobile');
 dateSpanMobile.innerHTML= `<strong>Date:</strong> ${today} |
 <strong>Time:</strong> ${time}`;




// To Do Modal JS
let taskName = document.getElementById('taskName');
let assignedTo = document.getElementById('assignedTo');
let form = document.getElementById('form');
let setStatus = document.getElementById('setStatus');
let errorElement = document.getElementById('errorMsg');
let description = document.getElementById('description');
var modal = document.getElementById("form");
var btn = document.getElementById("myBtn");
var span = document.getElementById("closebtn");
let dueDate = document.getElementById('dueDate');

let modalOverlay = document.getElementById('modalOverlay');
let mobileAddTaskBtn = document.getElementById('addTaskBtnMobile');

dueDate.addEventListener("click", function () {
    let today = new Date();
    let dateToday = String(today.getDate()).padStart(2, "0");
    let monthToday = String(today.getMonth() + 1).padStart(2, "0");
    let yearToday = today.getFullYear();
    let minDate = `${yearToday}-${monthToday}-${dateToday}`;
    dueDate.min = minDate;
  });


btn.onclick = function() {
  modal.style.display = "block";
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
  
}

span.onclick = function() {
  modal.style.display = "none";
  modalOverlay.style.opacity = "1";
  modalOverlay.style.backgroundColor = "transparent";
}
mobileAddTaskBtn.onclick = function() {
    modal.style.display = "block";
    modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
   
  };

form.addEventListener('submit', (e) => {
    let messages = []
    if(taskName.value === ''){
        messages.push('Task Name is Required')
    }

    if (taskName.value.length < 8){
        messages.push('Task Name must be longer than 8 characters')
    }
    if (assignedTo.value == "" ){
        messages.push('Task must be assigned')
    }
    if (setStatus.value == ""){
        messages.push('Please set a status.')
    }
    if (dueDate.value === ""){
        messages.push('Please set a due date!')
    }
    if (description.value == ""){
        messages.push('Please write a description')
    }
    if (description.value.length < 20){
        messages.push('Please write a description of at least 20 characters')
    }
    if (messages.length > 0){
        e.preventDefault()
        errorElement.innerText = messages.join('. ')
    }
    
})




 //Begin Javascript for adding todo


 let toDoItems = [];

//  function addToDo() {
//     const newToDo = {
//         taskName: taskName,
//         assignTo: assignTo,
//         dueDate: dueDate,
//         selectStatus: selectStatus,
//         addDescription: addDescription,
//     };
//     toDoItems.push(newToDo);
//     console.log(toDoItems)
//  };


//  class NewTask {
//     constructor(taskName, assignTo, dueDate, selectStatus, addDescription, ID) {
//       this.taskName = taskName;
//       this.assignTo = assignTo;
//       this.dueDate = dueDate;
//       this.selectStatus = selectStatus;
//       this.addDescription = addDescription;
//       this.ID = Math.floor(Math.random()*10000);
//     }
//     get taskName() {
//         return this.taskName;
//     }

//     get assignTo() {
//         return this.assignTo;
//     }

//     get dueDate() {
//         return this.dueDate;
//     }

//     get selectStatus() {
//         return this.selectStatus;
//     }

//     get addDescription() {
//         return this.addDescription;
//     }

//     incrementID() {
//         this.ID++;
//     }
//   }


//   taskName = document.getElementById('modalTaskName').value
//   assignTo =document.getElementById('modalAssignTo').value
//   dueDate = document.getElementById('modalDueDate').value
//   selectStatus = document.getElementById('modalSelectStatus').value
//   addDescription = document.getElementById('modalAddDescription').value
//   ID = incrementID();

  
//   function addNewTask() {
//     const adddNew = new NewTask('taskName, assignTo, dueDate, selectStatus, addDescription, ID');
//   }

