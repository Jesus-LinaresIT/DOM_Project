// Define UI vars
const form = document.querySelector('#task-form'),
      taskInput = document.querySelector('#task'),
      filter = document.querySelector('#filter'),
      taskList = document.querySelector('.collection'),
      clearBtn = document.querySelector('.clear-tasks');




// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
   //DOM load event
   document.addEventListener('DOMContentLoaded', getTasks);
   // Add task
   form.addEventListener('submit', addTask);
   // Remove a task
   taskList.addEventListener('click', removeTask);
   // Clear all task
   clearBtn.addEventListener('click', clearTasks);
   // Filter task
   filter.addEventListener('keyup', filterTasks);
}


// Get Tasks from LS
function getTasks(){
   let tasks;
   if(localStorage.getItem('tasks') === null){
      tasks = [];
   }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.appendChild(document.createTextNode(task));

      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.innerHTML = "<i class='fa fa-trash'></i>";

      li.appendChild(link);
      taskList.appendChild(li);
   })
}


// Add task
function addTask(e){
   if (taskInput.value !== ''){
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.appendChild(document.createTextNode(taskInput.value));

      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.innerHTML = "<i class='fa fa-trash'></i>";

      li.appendChild(link);
      taskList.appendChild(li);

      // Store in LS
      storeTaskLocalStore(taskInput.value);

      taskInput.value = '';
   }else{
      alert('Please add task');
   }

   e.preventDefault();
}


// Store task
function storeTaskLocalStore(task){
   let tasks;
   if(localStorage.getItem('tasks') === null){
      tasks = [];
   }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.push(task);
   localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove a task
function removeTask(e){
   if(e.target.parentElement.classList.contains('delete-item')){
      if(confirm('Are you sure you want to remove task?')){
         e.target.parentElement.parentElement.remove();

         // Remove from LS
         removeTaskFromLocalStore(e.target.parentElement.parentElement);
      }
   }
}


// Remove from localStorage
function removeTaskFromLocalStore(taskItem){
   let tasks;
   if(localStorage.getItem('tasks') === null){
      tasks = [];
   }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
         tasks.splice(index, 1);
      }
   });

   localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear all task
function clearTasks(){
   if(confirm('Are you sure you want to remove all tasks?')){
      while (taskList.firstChild) {
         taskList.removeChild(taskList.firstChild);
      }
      // Clear task from LS
      clearTaskFromLocalStore();
   }
}


// Clear tasks form from localStorage
function clearTaskFromLocalStore(){
   localStorage.clear();
}


// Filter tasks
function filterTasks(e){
   const text = e.target.value.toLowerCase();

   document.querySelectorAll('.collection-item').forEach(
      task => {
      const item = task.firstChild.textContent;

      if (item.toLowerCase().indexOf(text) !== -1) {
         task.style.display = 'block';
      }else{
         task.style.display = 'none';
      }
   });
}