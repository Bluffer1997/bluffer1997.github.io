const toggleButton = document.querySelector('.toggle-button');
const toggle = document.querySelector('.toggle'); // the ul with class toggle

toggleButton.addEventListener('click', () => {
    toggle.classList.toggle('active');
    toggle.classList.toggle('mobile');
    console.log('we be toggling')
});