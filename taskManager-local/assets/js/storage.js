// Add to LocalStorage function declaration 
function addToDatabase(newTask) {  
    let listofTasks; 
    if(localStorage.getItem('tasks') == null)   {    
        listofTasks = []; 

    }  
    else {     
        listofTasks = JSON.parse(localStorage.getItem('tasks'));

    }    
    listofTasks.push(newTask); 

    localStorage.setItem('tasks', JSON.stringify(listofTasks));
}

function loadFromDb(){
    let listOfTask;
    if (localStorage.getItem("tasks") == null){
        listOfTask = [];
    }
    else{
        listOfTask = JSON.parse(localStorage.getItem("tasks"));
    }
    return listOfTask;
}

// DOM load event
 document.addEventListener('DOMContentLoaded', loadTasksfromDB);

// Load from Storage Database
function loadTasksfromDB() { 
    let listofTasks = loadfromDB();
    if (listofTasks.length != 0) { 
        listofTasks.forEach(function(eachTask) { 
            const li = document.createElement('li');   // Create an li element when the user adds a task 
            li.className = 'collection-item';    // Adding a class          
            li.appendChild(document.createTextNode(eachTask));  // Create text node and append it           
            const link = document.createElement('a');  // Create new element for the link           
            link.className = 'delete-item secondary-content'; // Add class and the x marker for a           
            link.innerHTML = '<i class="fa fa-remove"> </i>';          
            li.appendChild(link); // Append link to li          
            taskList.appendChild(li); // Append to UL         
        });  
    } 
}

// Clear from Local Storage
function clearAllTasksfromDB(){
    if(localStorage.getItem('tasks') != null)   {    
        localStorage.clear();

    }
}

// function remove from local storage

function removefromDB(taskItem){
    let listOfTasks;
    if(localStorage.getItem('tasks') == null){ // check if the local storage is empty
        listOfTasks = []
    }
    else{
        listOfTasks = JSON.parse(localStorage.getItem('tasks'))
    }
    listOfTasks.forEach(function (task, index){ // iterate through the list to get the selected item
        if(taskItem.textContent == task){ // check if the item is the selected task
            listOfTasks.splice(index, 1) // remove the task 

        }
        localStorage.setItem('tasks', JSON.stringify(listOfTasks)); // updates the local storage
    })

}
