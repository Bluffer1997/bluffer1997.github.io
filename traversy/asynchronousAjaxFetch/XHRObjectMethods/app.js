document.querySelector('#button').addEventListener('click', loadData);


function loadData () {
    // Create XHR Object
    const xhr = new XMLHttpRequest();
    // OPEN (Specify type of request we want to make and URL or File Name to make it to)
    xhr.open('GET', 'data.txt', true);

    // console.log('READYSTATE', xhr.readyState) 

    // Optional - Used for loaders/spinners
    xhr.onprogress = function() {
        console.log('READYSTATE', xhr.readyState);
    }

    xhr.onload = function() {
        // console.log('READYSTATE', xhr.readyState)
        if (this.status === 200) {
            // console.log(this.responseText);
            document.getElementById('output').innerHTML = `<h1>${this.responseText}</h1>`;
        }
     }
     

     //This is the old way    
     /*
     xhr.onreadystatechange = function () {
        console.log('READYSTATE', xhr.readyState)
        if (this.status === 200 && this.readyState === 4) {
            console.log(this.responseText);
        }
    }
    */

     xhr.onerror = function () {
        console.log('Request error...')         
     }
     xhr.send();
    }


/*
    HTTP STATUSES
    200 : 'Okay'
    403 : 'Forbidden'
    404 : 'Not Found'
*/


/*
    readyState Values
        0 : request not initialized
        2 : server connection established
        3 : request received
        4 : processing request
        5 : request finished and response is ready
*/