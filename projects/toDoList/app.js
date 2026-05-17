// Selectors
const toDoInput = document.querySelector('#todo-input'); //INPUT
const toDoButton = document.querySelector('#todo-button'); // BUTTON
const toDoList = document.querySelector('.todo-list'); // To Do UL
const clearBtn = document.querySelector('#clearItems');

// Event Listeners

toDoButton.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
// toDoList.addEventListener('click', editCheck);
clearBtn.addEventListener('click', clearItems);

//  Functions

function addToDo (e) {
    e.preventDefault();
    // To Do Div
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('todo');

    // Create LI
    const newToDo = document.createElement('li');
    newToDo.classList.add('todo-item');
    newToDo.innerText = toDoInput.value;
    toDoDiv.appendChild(newToDo);

    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="far fa-check-circle"></i>';
    completedButton.classList.add('complete-btn');
    toDoDiv.appendChild(completedButton);

    // Check Edit Button
   
    // const editButton = document.createElement('button');
    // editButton.innerHTML = '<i class="far fa-edit"></i>';
    // editButton.classList.add('edit-btn');
    // toDoDiv.appendChild(editButton);

    // Check Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="far fa-times-circle"></i>';
    deleteButton.classList.add('delete-btn');
    toDoDiv.appendChild(deleteButton);

    // Append To List
    toDoList.appendChild(toDoDiv);

    // Clear To Do Input Value 
    toDoInput.value = '';
};


function deleteCheck (e) {
    const item = e.target;
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.remove();
    }

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        console.log('completed!')
    }
}

/*
 function editCheck (e) {
    // Show edit button (clicking this will additionally act as save changes button)
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="far fa-edit"></i>';
    editButton.classList.add('edit-btn');

    e.target.parentElement.appendChild(editButton);
    document.querySelector('.edit-btn').style.display = 'block';
    
    // toDoDiv.appendChild(editButton);

} */

function clearItems() {
    while (toDoList.firstChild) {
        toDoList.removeChild(toDoList.firstChild)
    }
}