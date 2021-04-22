// Displaying current year in the footer
const currentYear = new Date().getFullYear();
const footer = document.querySelector('footer');
footer.innerHTML += `${currentYear}`;

// Search Input
const searchUser = document.getElementById('searchUser');

// Creating keyup event for search input
searchUser.addEventListener('keyup', (e) => {
    // Get input text
    const userText = e.target.value;
    if (userText!== '') {
        
    }
});