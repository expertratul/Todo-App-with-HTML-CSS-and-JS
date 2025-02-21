// Selecting necessary elements

// Input field for new task
const newTaskInput = document.getElementById("new-task");
            // console.log(newTaskInput);

// Button to add/update task
const addTaskButton = document.getElementById("addTask");
            // console.log(addTaskButton);

// List of incomplete tasks
const incompleteTaskList = document.getElementById("items");

// List of completed tasks
const completedTaskList = document.querySelector(".complete-list ul");
            // console.log(completedTaskList);


// Variable to track the task being edited
let editingTask = null;

//Function to add or update a task
function addOrUpdateTask(event) {

    // prevent Browser reload
    event.preventDefault();

    // Get The Task Text
    const taskText = newTaskInput.value.trim();

    // if input is empty do nothing
    if(taskText === "") return;


    if(editingTask){
        //editing Task
        editingTask.querySelector("label"). textContent = taskText;
        addTaskButton.value = "Add Task";
        editingTask = null;
    }else{
        // Add New Task
        const listItem = createTaskElement(taskText);
        incompleteTaskList.appendChild(listItem);
    }

    newTaskInput.value = ""; //Clear the input field
}

//Function to Create a new task element
function createTaskElement(taskText) {

    //li Creation
    const li = document.createElement("li");
    li.classList.add("item");

    //Checkbox Creation
    const Checkbox = document.createElement("input");
    Checkbox.type = "checkbox";

    // complete event fire
    Checkbox.addEventListener("change", completeTask);

    //Label Creation
    const label = document.createElement("label");
    label.textContent = taskText;

    //edit button creation
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");

    // edit event fire
    editButton.addEventListener("click", editTask);


    //add element to the list item(li)
    li.appendChild(Checkbox);
    li.appendChild(label);
    li.appendChild(editButton);

    return li;
}

// Function to edit an existing task
function editTask(){
    const listItem = this.parentElement;  // get the parent(li)
    const label = listItem.querySelector("label"); // get label

    //populate the new task input field with the incomplete task text
    newTaskInput.value = label.textContent;

    //update the add task button to update task
    addTaskButton.value = "update Task";
    editingTask = listItem; // set the editing mode
}

//Function to Mark a task as Complete
function completeTask(){
    const listItem = this.parentElement; //get the parent(li)
    this.remove(); //Remove the checkbox when ti is checked as completed

    listItem.querySelector(".edit").remove(); //remove the edit button to the completed panel

    // delete button creation
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", deleteTask);

    listItem.appendChild(deleteButton); //add the delete button to the complete panel's (li)

    //add the task item to complete panel
    completedTaskList.appendChild(listItem);
}

// Function to delete a complete task
function deleteTask(){
    const listItem = this.parentElement; //get parent (li)
    listItem.remove();
}

//Event listener for adding or updating a task
addTaskButton.addEventListener("click", addOrUpdateTask);