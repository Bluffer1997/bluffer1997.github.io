// default booking dates
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1)
document.getElementById('checkIn').value = today.toISOString().split('T')[0];
document.getElementById('checkOut').value = tomorrow.toISOString().split('T')[0];


// year 
const footer = document.getElementById('footer');
const thisYear = new Date().getFullYear();
footer.innerHTML = '© ' + thisYear + ' Hotel Manager' + '<br/> Last worked on: Sunday August 09 2026';

// room prices
const roomPrices = {
    single: 119.99,
    double: 174.99,
    suite: 319.99 
}
document.getElementById('singlePrice').textContent = '$' + roomPrices.single + '/night';
document.getElementById('doublePrice').textContent = '$' + roomPrices.double + '/night';
document.getElementById('suitePrice').textContent = '$' + roomPrices.suite + '/night';

//booking section
let currentBooking = {};
const searchButton = document.querySelector("#searchDate");
searchButton.addEventListener("click", () => {
    const selectedRoom = document.getElementById('roomDropDown').value;
        if (selectedRoom === '') {
            alert("You've not entered a room type!")
            return;
        };
    const price = roomPrices[selectedRoom]
    const checkInValue = document.getElementById("checkIn").value;
    const checkOutValue = document.getElementById("checkOut").value;

    // make sure check out is after check in date. 
        const todayString = today.toISOString().split('T')[0];
            if (checkInValue < todayString ) {
                alert("Error! Check in date can not be before today!");
                return;
            }
            // make sure check out is after check in
            if (checkOutValue <= checkInValue) {
                alert("Error! Check out date must be after check in date!");
                return;
            }
        const checkInDate = new Date(checkInValue);
        const checkOutDate = new Date(checkOutValue);
        const days = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
  
    updateBookingSummary(
        selectedRoom,
        checkInValue,
        checkOutValue,
        days,
        price
    ); 
    // booking

        currentBooking = {
            room: selectedRoom,
            checkIn: checkInValue,
            checkOut: checkOutValue,
            nights: days,
            price: price,
            subtotal: days * price,
            tax: 0,
            total: days * price
        };
        console.log(currentBooking)

});


//booking summary section 
function updateBookingSummary(
    selectedRoom,
    checkInValue, 
    checkOutValue, 
    days,
    price
) {
    const summaryRoom = document.getElementById('summaryRoom');
    const summaryCheckIn = document.getElementById('summaryCheckIn')
    const summaryCheckOut = document.getElementById('summaryCheckOut')
    const summaryNights = document.getElementById('summaryNights')     
    const summaryPrice = document.getElementById('summaryPrice')
    const summaryTotal = document.getElementById('summaryTotal')
    
        summaryRoom.textContent = selectedRoom;
        summaryCheckIn.textContent = checkInValue;
        summaryCheckOut.textContent = checkOutValue;
        summaryNights.textContent = days;
        summaryPrice.textContent = '$' + price;
            const subtotal = days * price;
            // const tax = subtotal * 0.12;
            let tax = 0;
            const total = subtotal + tax;
            summaryTotal.textContent = '$' + total.toFixed(2);
        }



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