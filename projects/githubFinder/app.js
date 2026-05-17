// Displaying current year in the footer
const currentYear = new Date().getFullYear();
const footer = document.querySelector('footer');
footer.innerHTML += `${currentYear}`;

// Initialize Github 
const github = new Github;

// Initialize UI
const ui = new UI;

// Search Input
const searchUser = document.getElementById('searchUser');

// Creating keyup event for search input
searchUser.addEventListener('keyup', (e) => {
    // Get input text
    const userText = e.target.value;
    if (userText!== '') {
        // console.log(userText)
        // Make HTTP Call
        github.getUser(userText)
        .then(data => {
            if (data.profile.message === 'Not Found') {
                // Show Alert
                ui.showAlert('User not found', 'alert alert-danger')
            } else {
                // Show Profile
                ui.showProfile(data.profile)
                // Show Repos
                ui.showRepos(data.repos)
            }
        })
    } else {
        // Clear Profile
        ui.clearProfile();
    }
});