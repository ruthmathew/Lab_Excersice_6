//UI variables 
const form = document.querySelector('#task-form'); //The form at the top
const taskInput = document.querySelector('#task'); //the task input text field

//read from q string 
const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('id'));
//DB
var DB;

// Add Event Listener [on Load]
document.addEventListener('DOMContentLoaded', () => {
    // create the database
    let TasksDB = indexedDB.open('tasks', 1);

    // if there's an error
    TasksDB.onerror = function() {
            console.log('There was an error');
        }
        // if everything is fine, assign the result to the instance
    TasksDB.onsuccess = function() {
        // console.log('Database Ready');

        // save the result
        DB = TasksDB.result;

        // display the Task 
        displayTask();
    }


    function displayTask() {

        var transaction = DB.transaction(['tasks']);
        var objectStore = transaction.objectStore('tasks');
        var request = objectStore.get(id);

        request.onsuccess = function(event) {
            if (request.result) {
                taskInput.value = request.result.taskname;

            } else {
                console.log('No data record');
            }
        };

        request.onerror = function(event) {
            console.log('Transaction failed');
        };



    }


    form.addEventListener('submit', updateTask);

    function updateTask(e) {
        e.preventDefault();
        // Check empty entry
        if (taskInput.value === '') {
            taskInput.style.borderColor = "red";

            return;
        }

        /* 
        Instruction set to handle Update

        1. Declare the transaction and object store objects 
        2. Use the id on put method of index db
        
        */

        // 1
        let transaction = DB.transaction('tasks', 'readwrite');
        let objectStore = transaction.objectStore('tasks');

        // 2
        let request = objectStore.openCursor();// creates a cursor and point to an element
        request.onerror = function (e) { // to handle error event

            console.log(" encountered an error"); 
        };
        request.onsuccess = function (e) {
            let cursor = e.target.result; // accept the returned value of the object were the cursor was pointing
            let newTask = { // create an object to assign the value of the returned object value (the cursor returned)
                taskname: taskInput.value,
                date: Date.now(),
                id: id
            }

            if (cursor) {
                
                if(cursor.value.id == id){ // check wether the cursor is pointing on the updated element
                    
                // if it is true
                var result = cursor.update(newTask); // update the database
                result.onsuccess = function (e) { // if the event  was a sucess
                    console.log("update success!!"); 
                }
                result.onerror = function (e) { // if the event (update) fail
                    console.log("update failed!!");
                }

            }
            cursor.continue();
        }
        else {
            console.log("end of update");
        }


        history.back();
    

        }
    }




});