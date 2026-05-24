//dates
const checkIn = document.querySelector("#checkIn");
const checkOut = document.querySelector("#checkOut");
const searchButton = document.querySelector("#searchDate");
searchButton.addEventListener("click", () => {
    alert(checkIn.value);
    alert(checkOut.value);
})

console.log(checkIn);
console.log(checkOut);
console.log(searchButton);

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