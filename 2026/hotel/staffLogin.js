
// STAFF LOGIN / SIGNUP

const staffLogin = document.querySelector(".login-btn");
const staffSignup = document.querySelector(".signup-btn");

const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");

const loginModalContent = loginModal.querySelector(".modal-content");
const signupModalContent = signupModal.querySelector(".modal-content");

const loginClose = loginModal.querySelector(".close-btn");
const signupClose = signupModal.querySelector(".close-btn");

const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");


// OPEN LOGIN MODAL / LOGOUT

staffLogin.addEventListener("click", () => {

    const loggedIn = localStorage.getItem("staffLoggedIn");

    if (loggedIn === "true") {

        localStorage.removeItem("staffLoggedIn");

        alert("You have been logged out.");

        updateStaffUI();

    } else {

        loginModal.style.display = "flex";

    }

});


// OPEN SIGNUP MODAL

staffSignup.addEventListener("click", () => {

    if (localStorage.getItem("staffAccount")) {
        alert("An administrator account already exists. Signup is disabled.");
        updateStaffUI();
        return;
    }

    signupModal.style.display = "flex";

});


// CLOSE LOGIN MODAL

loginClose.addEventListener("click", () => {
    loginModal.style.display = "none";
});


// CLOSE SIGNUP MODAL

signupClose.addEventListener("click", () => {
    signupModal.style.display = "none";
});


// CLICKING BACKDROP CLOSES LOGIN MODAL

loginModal.addEventListener("click", () => {
    loginModal.style.display = "none";
});


// CLICKING BACKDROP CLOSES SIGNUP MODAL

signupModal.addEventListener("click", () => {
    signupModal.style.display = "none";
});


// PREVENT CLICKING INSIDE LOGIN MODAL FROM CLOSING IT

loginModalContent.addEventListener("click", (event) => {
    event.stopPropagation();
});


// PREVENT CLICKING INSIDE SIGNUP MODAL FROM CLOSING IT

signupModalContent.addEventListener("click", (event) => {
    event.stopPropagation();
});


// ADMIN ACCOUNT SIGNUP

signupButton.addEventListener("click", () => {

    if (localStorage.getItem("staffAccount")) {
        alert("An administrator account already exists. Signup is disabled.");
        signupModal.style.display = "none";
        updateStaffUI();
        return;
    }

    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    if (username === "" || password === "") {
        alert("Please enter a username and password.");
        return;
    }

    const staffAccount = {
        username: username,
        password: password
    };

    localStorage.setItem(
        "staffAccount",
        JSON.stringify(staffAccount)
    );

    alert("Administrator account created successfully!");

    signupModal.style.display = "none";

    document.getElementById("signupUsername").value = "";
    document.getElementById("signupPassword").value = "";

    updateStaffUI();

});


// ADMIN LOGIN

loginButton.addEventListener("click", () => {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please enter your username and password.");
        return;
    }

    const savedAccount = localStorage.getItem("staffAccount");

    if (!savedAccount) {
        alert("No administrator account exists. Please create one first.");
        return;
    }

    const staffAccount = JSON.parse(savedAccount);

    if (
        username === staffAccount.username &&
        password === staffAccount.password
    ) {

        localStorage.setItem("staffLoggedIn", "true");

        alert("You are now logged in!");

        loginModal.style.display = "none";

        document.getElementById("username").value = "";
        document.getElementById("password").value = "";

        updateStaffUI();

    } else {

        alert("Incorrect username or password.");

    }

});


// UPDATE ADMIN UI

function updateStaffUI() {

    const loggedIn = localStorage.getItem("staffLoggedIn") === "true";

    const roomInventory = document.getElementById("roomInventory");
    const reservationsDashboard = document.getElementById("reservationsDashboard");
    const editReservationModal = document.getElementById("editReservationModal");

    const accountExists = localStorage.getItem("staffAccount") !== null;

    if (loggedIn) {

        staffLogin.textContent = "Logout";

        roomInventory.style.display = "block";
        reservationsDashboard.style.display = "block";

        staffSignup.style.display = "none";

    } else {

        staffLogin.textContent = "Staff Login";

        roomInventory.style.display = "none";
        reservationsDashboard.style.display = "none";

        staffSignup.style.display = accountExists ? "none" : "inline-block";

        editReservationModal.style.display = "none";

    }

}


// CHECK LOGIN STATUS WHEN PAGE LOADS

updateStaffUI();

// END STAFF LOGIN / SIGNUP
