const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-Content");
console.log(loginBtn);
console.log(signupBtn);
console.log(modal);
console.log(modalContent);

loginBtn.addEventListener("click", () => {
   modal.style.display = "flex"; 
});

modal.addEventListener("click", () => {
    modal.style.display = "none";
})

.modalContent.addEventListener("click", (e) => {
    e.stopPropogation();
})