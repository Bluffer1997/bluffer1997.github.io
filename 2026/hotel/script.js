//dates
const searchButton = document.querySelector("#searchDate");
searchButton.addEventListener("click", () => {
    const checkInValue = document.getElementById("checkIn").value;
    const checkOutValue = document.getElementById("checkOut").value;
    const CheckInDate = new Date(checkInValue);
    const checkOutDate = new Date(checkOutValue);
    const days = (checkOutDate - CheckInDate) / (1000 * 60 * 60 * 24);
    alert('You will check in on ' + checkInValue);
    console.log('Checking in: ' + checkInValue);
    alert('You will check out on ' + checkOutValue);
    console.log('Checking out: ' + checkOutValue);
    alert('You will rent this room for ' + days + ' days.');
    console.log('Renting for ' + days + ' days.');

})


// modal 
const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
loginBtn.addEventListener("click", () => {
   modal.style.display = "flex"; 
});

modal.addEventListener("click", () => {
    modal.style.display = "none";
})

modalContent.addEventListener("click", (e) => {
    e.stopPropagation();
})

//end modal