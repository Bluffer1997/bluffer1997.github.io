const body = document.querySelector('body');
const click = document.querySelector('.click');

const colors = ['red', 'blue', 'green', 'yellow', 'orange'];

click.addEventListener("click", function(e) {
    let random = colors[Math.floor(Math.random()*colors.length)];
    console.log(random);
    body.style.backgroundColor = random;
});

// Console log, random item of my array, every time the button is clicked. 

// Make the background = to whatever random picks. 
