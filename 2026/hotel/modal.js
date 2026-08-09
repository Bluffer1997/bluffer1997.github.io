// modal 
const staffLogin = document.querySelector(".login-btn");
const staffSignup = document.querySelector(".signup-btn");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalClose = document.querySelector('.close-btn');

staffLogin.addEventListener("click", () => {
   modal.style.display = "flex"; 
});

modal.addEventListener("click", () => {
    modal.style.display = "none";
})

modalContent.addEventListener("click", (e) => {
    e.stopPropagation();
})

modalClose.addEventListener("click", () => {
    modal.style.display = 'none';
});

const loginButton = document.querySelector('.primary-btn');
    loginButton.addEventListener("click", () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username === "" || password === "") {
            alert('Error With Logging In!')
        } else {
            alert('You are now logged in!' + ' Welcome, ' + username + '.');
        }
    })
//end modal