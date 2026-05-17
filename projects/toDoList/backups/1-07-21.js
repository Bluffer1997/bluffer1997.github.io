/*
When button is clicked, create a new 'LI' element under "theList" and make the text value that of #itemName 
(Afterward) Additionally, we should append this to include the buttons
*/

const enterItem = document.getElementById('enterItem'); //INPUT
const addItem = document.getElementById('addItem'); // BUTTON
const theList = document.querySelector('.theList'); // list container 
// const item = document.querySelector('.item'); // CONTAINER

addItem.addEventListener('click', (e) => {
    e.preventDefault;

    // (The .item)

    let theItem = document.createElement('div');
    theItem.className = 'item';
    theList.appendChild(theItem);

    // (The Item name)
    let itemName = document.createElement('div');
    itemName.id = 'itemName';
    let theItemValue = document.createTextNode(enterItem.value);
    itemName.appendChild(theItemValue);
    theItem.appendChild(itemName); 


    // (Buttons)

    let buttonsDivContainer = document.createElement('div');
    buttonsDivContainer.id = 'itemButtons';
    theItem.appendChild(buttonsDivContainer);

    // create the completed button
    let completed = document.createElement('span');
    completed.id = 'completed';
    buttonsDivContainer.appendChild(completed);
    let completedA = document.createElement('a');
    let completedI = document.createElement('i');
    completed.appendChild(completedA);
    completedI.classList.add('far', 'fa-check-circle');
    completedA.appendChild(completedI);

    // create the edit button
    let edited = document.createElement('span');
    edited.id ='edit';
    buttonsDivContainer.appendChild(edited)

    let editedA = document.createElement('a');
    let editedI = document.createElement('i');

    edited.appendChild(editedA);
    editedI.classList.add('far', 'fa-edit');
    editedA.appendChild(editedI);

    // create the delete button 

    let deleted = document.createElement('span');
    deleted.id = 'delete';
    buttonsDivContainer.appendChild(deleted);
    let deletedA = document.createElement('a');
    let deletedI = document.createElement('i');
    deleted.appendChild(deletedA);
    deletedI.classList.add('far', 'fa-times-circle');
    deletedA.appendChild(deletedI);
    // console.log(document.body)

    document.querySelector('#delete').addEventListener('click', (e) => {
        e.target.parentElement.parentElement.parentElement.parentElement.remove();
        // console.log(e.target.parentElement.parentElement.parentElement.parentElement);
    });

});