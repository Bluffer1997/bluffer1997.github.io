const ToggleButton = document.querySelector('.toggle-button');
const Toggle = document.querySelector('.toggle');
const headerContainer = document.querySelector('.container');
const navBar = document.querySelector('.navbar');

ToggleButton.addEventListener('click', function() {
    Toggle.classList.toggle('active');
    // navBar.style.background = 'transparent';
    navBar.style.margin = '0';
});

// If toggle has a class of "active", make the Nav's background transparent, otherwise make it #fff (white).
// if (Toggle.classList.contains('active')) {
//     navBar.style.background = 'transparent';
// } else {
//     navBar.style.background = '#fff';
// }



// If toggleButton is active, show close button. If toggle button is not active, show toggle button.
// if UL with class of "toggle" has currently has class of "active", show close Button. Otherwise show toggle button. 