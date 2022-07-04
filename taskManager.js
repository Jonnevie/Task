 //class constructor
 class TaskManager {
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

  export {TaskManager};