// year 
const footer = document.getElementById('footer');
const thisYear = new Date().getFullYear();
footer.innerHTML = '© ' + thisYear + ' Hotel Manager';

//booking section
const searchButton = document.querySelector("#searchDate");
searchButton.addEventListener("click", () => {
    const selectedRoom = document.getElementById('roomDropDown').value;
        if (selectedRoom === '') {
            alert("You've not entered a room type.")
            return;
        };
    const checkInValue = document.getElementById("checkIn").value;
    const checkOutValue = document.getElementById("checkOut").value;
    const CheckInDate = new Date(checkInValue);
    const checkOutDate = new Date(checkOutValue);
    const days = (checkOutDate - CheckInDate) / (1000 * 60 * 60 * 24);
        const message = 'You will check in on ' + checkInValue + '.\n' + 
                    'You will check out on ' + checkOutValue + '.\n' +
                    'You will be staying in this room for ' + days + ' days.\n' + 
                    'You will rent a ' + selectedRoom + ' room.';
    alert(message);
    
});
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
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (email === "" || password === "") {
            alert('error with logging in')
            console.log('error with logging in.')
        } else {
            alert('logged in!' + ' welcome ' + email);
        }
    })
//end modal