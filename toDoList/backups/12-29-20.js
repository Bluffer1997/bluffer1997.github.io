/*
When button is clicked, create a new 'LI' element under "theList" and make the text value that of #itemName 
(Afterward) Additionally, we should append this to include the buttons
*/

const enterItem = document.getElementById('enterItem'); //INPUT
const addItem = document.getElementById('addItem'); // BUTTON
// const item = document.querySelector('.item'); // CONTAINER

addItem.addEventListener('click', () => {

    // (The List)
    let theList = document.createElement('div');
    theList.className = 'theList';
    let theBody = document.querySelector('body').appendChild(theList);

    // (The .item)

    let theItem = document.createElement('div');
    theItem.className = 'item';
    theList.appendChild(theItem);
    console.log(theList)
    console.log(theItem)


    // (The Item name)
    let itemName = document.createElement('div');
    itemName.id = 'itemName';
    let theItemValue = document.createTextNode(enterItem.value);
    itemName.appendChild(theItemValue);
    item.appendChild(itemName); 

    // (Buttons)
    
    let buttonsDivContainer = document.createElement('div');
    buttonsDivContainer.id = 'itemButtons';
    // item.appendChild(buttonsDivContainer);


    let completed = document.createElement('span');
    completed.id = 'completed';
    buttonsDivContainer.appendChild(completed);


    let completedA = document.createElement('a');
    let completedI = document.createElement('i');
    completed.appendChild(completedA);
    completedI.classList.add('far', 'fa-check-circle');
    completedA.appendChild(completedI);
});