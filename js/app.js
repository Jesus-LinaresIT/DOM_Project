// Define UI vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn= document.querySelector('.clear-tasks');


// Load all event listeners
loadEventListeners();
// Load all event listeners
function loadEventListeners() {

   // Add task event
   form.addEventListener('submit', addTask);

   // Remove a task list
   taskList.addEventListener('click', removeTask);

   // Remove all task
   clearBtn.addEventListener('click', clearTask);

   // Filter
   //filter.addEventListener('keyup', filterTask);
}


// Add Task
function addTask(e){
   if (taskInput.value !== ''){

      // Create li element
      const li = document.createElement('li');

      // Add class
      li.className = 'collection-item';

      // Create text node and append to li
      li.appendChild(document.createTextNode(taskInput.value));

      // Create new link element
      const link = document.createElement('a');

      // Add class
      link.className ='delete-item secondary-content';

      // Add icon HTML
      link.innerHTML = '<i class="fas fa-trash"></i>';

      // Append the link to li
      li.appendChild(link);

      // Append li to ul
      taskList.appendChild(li);

      // Clear input
      taskInput.value = '';
   }else{
      alert('Please add task to collection');
   }

   e.preventDefault();
}



// Remove Task
function removeTask(e){
   if(e.target.parentElement.classList.contains
      ('delete-item')){
         if(confirm('Are you sure you want to remove task?')){
            e.target.parentElement.parentElement.remove();
         }
      }
}


// Clear Tasks
function clearTask(e){
   // Remove all tasks from collection
   while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
   }
}


