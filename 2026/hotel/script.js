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


// OPEN LOGIN MODAL

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


// STAFF SIGNUP

signupButton.addEventListener("click", () => {

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

    alert("Staff account created successfully!");

    signupModal.style.display = "none";

    document.getElementById("signupUsername").value = "";
    document.getElementById("signupPassword").value = "";

});


// STAFF LOGIN

loginButton.addEventListener("click", () => {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please enter your username and password.");
        return;
    }

    const savedAccount = localStorage.getItem("staffAccount");

    if (!savedAccount) {
        alert("No staff account exists. Please sign up first.");
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


// UPDATE STAFF UI

function updateStaffUI() {

    const loggedIn = localStorage.getItem("staffLoggedIn");

    if (loggedIn === "true") {

        staffLogin.textContent = "Logout";
        staffSignup.style.display = "none";

    } else {

        staffLogin.textContent = "Staff Login";
        staffSignup.style.display = "inline-block";

    }

}


// CHECK LOGIN STATUS WHEN PAGE LOADS

updateStaffUI();

// END STAFF LOGIN / SIGNUP


// default booking dates
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1)
document.getElementById('checkIn').value = today.toISOString().split('T')[0];
document.getElementById('checkOut').value = tomorrow.toISOString().split('T')[0];


// year 
const footer = document.getElementById('footer');
const thisYear = new Date().getFullYear();
footer.innerHTML = '© ' + thisYear + ' Hotel Manager' + '<br/> Last worked on: Tuesday September 21 2026';

// room prices
const roomPrices = {
    single: 119.99,
    double: 149.99,
    suite: 199.99 
}
document.getElementById('singlePrice').textContent = '$' + roomPrices.single + '/night';
document.getElementById('doublePrice').textContent = '$' + roomPrices.double + '/night';
document.getElementById('suitePrice').textContent = '$' + roomPrices.suite + '/night';

//booking section
let currentBooking = {};
let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
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
        localStorage.setItem("currentBooking", JSON.stringify(currentBooking));

});


//booking summary section 
function updateBookingSummary(
    selectedRoom,
    checkInValue, 
    checkOutValue, 
    days,
    price
) 
{
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
            let tax = 0;
            const total = subtotal + tax;
            summaryTotal.textContent = '$' + total.toFixed(2);
        }

// Load Saved Booking
const savedBooking = localStorage.getItem("currentBooking");

if (savedBooking) {
    const booking = JSON.parse(savedBooking);
    currentBooking = booking;
    updateBookingSummary(
        booking.room,
        booking.checkIn,
        booking.checkOut,
        booking.nights,
        booking.price
    );
}


// rooms 
const roomDropDown = document.getElementById("roomDropDown");
const bookingBar = document.querySelector(".booking-bar");

const singleBook = document.getElementById("singleBook");
    singleBook.addEventListener("click", () => {
        roomDropDown.value = "single";
        bookingBar.scrollIntoView({ behavior: "smooth" });
        });

const doubleBook = document.getElementById("doubleBook");
    doubleBook.addEventListener("click", () => {
            roomDropDown.value = "double";
            bookingBar.scrollIntoView({ behavior: "smooth" });
        });

const suiteBook = document.getElementById("suiteBook");
    suiteBook.addEventListener("click", () => {
        roomDropDown.value = "suite";
        bookingBar.scrollIntoView({ behavior: "smooth" });
        });


// Guest Info

const continueBooking = document.getElementById("continueBooking")
    continueBooking.addEventListener("click", () => {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phone = document.getElementById('phone').value;

        if (firstName === '' || lastName === '' || phone=== '') {
            alert("Error! You must enter all guest information!");
            return;
        }
        currentBooking.guest = {
            firstName: firstName,
            lastName: lastName,
            phone: phone  
        };
    localStorage.setItem("currentBooking", JSON.stringify(currentBooking));
    });

    // Booking Confirmation
const bookingConfirmation = document.querySelector(".booking-confirmation");
    bookingConfirmation.style.display = 'none';
    const confirmGuest = document.getElementById("confirmationGuest");
    const confirmRoom = document.getElementById("confirmationRoom");
    const confirmCheckIn = document.getElementById("confirmationCheckIn");
    const confirmCheckOut = document.getElementById("confirmationCheckOut");
    const confirmNights = document.getElementById("confirmationNights");
    const confirmTotal = document.getElementById("confirmationTotal");

continueBooking.addEventListener("click", () => {
        if (!currentBooking.guest) {    
            return;
        }
    confirmGuest.textContent = currentBooking.guest.firstName + " " + currentBooking.guest.lastName;
    confirmRoom.textContent = currentBooking.room;
    confirmCheckIn.textContent = currentBooking.checkIn;
    confirmCheckOut.textContent = currentBooking.checkOut;
    confirmNights.textContent = currentBooking.nights;
    confirmTotal.textContent = "$" + currentBooking.total.toFixed(2);
    bookingConfirmation.style.display = 'block';
    bookingConfirmation.scrollIntoView({behavior: 'smooth'});
});

// Finalize Booking
const confirmBooking = document.getElementById('confirmBooking');
const confirmationId = document.getElementById('confirmationId');

confirmBooking.addEventListener("click", () => {

    // Get the next reservation number
    let reservationNumber = localStorage.getItem("reservationNumber");

    if (reservationNumber === null) {
        reservationNumber = 1000;
    } else {
        reservationNumber = Number(reservationNumber) + 1;
    }

    // Add reservation number to current booking
    currentBooking.reservationId = reservationNumber;
    currentBooking.status = "Reserved";

    // Add booking to reservations array
    reservations.push(currentBooking);

    // Save everything
    localStorage.setItem("reservationNumber", reservationNumber);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    localStorage.setItem("currentBooking", JSON.stringify(currentBooking));

    // Display reservation number
    confirmationId.textContent = reservationNumber;
    console.log("Your booking is confirmed:", currentBooking);
    console.log("All reservations:", reservations);

displayReservations();
});

// Reservation Lookup

const lookupButton = document.getElementById("lookupButton");
const lookupResult = document.getElementById("lookupResult");

const lookupReservationId = document.getElementById("lookupReservationId");
const lookupGuest = document.getElementById("lookupGuest");
const lookupPhone = document.getElementById("lookupPhone");
const lookupRoom = document.getElementById("lookupRoom");
const lookupCheckIn = document.getElementById("lookupCheckIn");
const lookupCheckOut = document.getElementById("lookupCheckOut");
const lookupNights = document.getElementById("lookupNights");
const lookupTotal = document.getElementById("lookupTotal");

lookupButton.addEventListener("click", () => {
const reservationNumber = Number(
    document.getElementById("reservationLookup").value
);

// Make sure something was entered
if (!reservationNumber) {
    alert("Please enter a reservation number.");
    return;
}

// Find reservation
const reservation = reservations.find(
    booking => Number(booking.reservationId) === reservationNumber
);

// Reservation doesn't exist
if (!reservation) {
    alert("Reservation not found.");
    lookupResult.style.display = "none";
    return;
}

// Display reservation
lookupReservationId.textContent = reservation.reservationId;

lookupGuest.textContent =
    reservation.guest.firstName + " " + reservation.guest.lastName;

lookupPhone.textContent = reservation.guest.phone;

lookupRoom.textContent = reservation.room;

lookupCheckIn.textContent = reservation.checkIn;

lookupCheckOut.textContent = reservation.checkOut;

lookupNights.textContent = reservation.nights;

lookupTotal.textContent =
    "$" + reservation.total.toFixed(2);

lookupResult.style.display = "block";

lookupResult.scrollIntoView({
    behavior: "smooth",
    block: "center"
});

});

// Delete All Reservations

const deleteAllReservations = document.getElementById("deleteAllReservations");

deleteAllReservations.addEventListener("click", () => {

    const confirmDelete = confirm(
        "Are you sure you want to delete ALL reservations?"
    );

    if (!confirmDelete) {
        return;
    }

    reservations = [];

    localStorage.removeItem("reservations");
    localStorage.removeItem("currentBooking");

    // Reset reservation numbering
    localStorage.removeItem("reservationNumber");

    displayReservations();

    confirmationId.textContent = "";

    alert("All reservations have been deleted. The next reservation will be #1000.");

    console.log("All reservations deleted.");
    console.log("Reservation number reset to 1000.");
});

// RESERVATIONS DASHBOARD

const reservationsTableBody = document.getElementById("reservationsTableBody");
const noReservations = document.getElementById("noReservations");

function displayReservations() {

    // Clear the table first
    reservationsTableBody.innerHTML = "";

    // Check if there are any reservations
    if (reservations.length === 0) {

        noReservations.style.display = "block";

        return;
    }

    noReservations.style.display = "none";

    // Create a row for each reservation
    reservations.forEach((reservation, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="reservation-number">
                ${reservation.reservationId}
            </td>

            <td>
                ${reservation.guest.firstName}
                ${reservation.guest.lastName}
            </td>

            <td>
                ${reservation.guest.phone}
            </td>

            <td class="reservation-room">
                ${reservation.room}
            </td>

            <td>
                ${reservation.checkIn}
            </td>

            <td>
                ${reservation.checkOut}
            </td>

            <td>
                ${reservation.nights}
            </td>

            <td class="reservation-total">
                $${reservation.total.toFixed(2)}
            </td>

            <td>
                ${reservation.status || "Reserved"}
            </td>
            
            <td>
                <button
                    class="cancel-reservation"
                    data-index="${index}">
                    Cancel
                </button>

                <button
                    class="delete-reservation"
                    data-index="${index}">
                    Delete
                </button>
            </td>
        `;

        reservationsTableBody.appendChild(row);

    });

}


// Display reservations when page loads
displayReservations();


// Delete individual reservation

reservationsTableBody.addEventListener("click", (event) => {

    if (!event.target.classList.contains("delete-reservation")) {
        return;
    }

    const index = Number(event.target.dataset.index);

    const reservation = reservations[index];

    const confirmDelete = confirm(
        "Delete reservation #" + reservation.reservationId + "?"
    );

    if (!confirmDelete) {
        return;
    }

    // Remove reservation from array
    reservations.splice(index, 1);

    // Save updated array
    localStorage.setItem(
        "reservations",
        JSON.stringify(reservations)
    );

    // Refresh table
    displayReservations();

});

// Cancel individual reservation

reservationsTableBody.addEventListener("click", (event) => {

    if (!event.target.classList.contains("cancel-reservation")) {
        return;
    }

    const index = Number(event.target.dataset.index);

    const reservation = reservations[index];

    if (!reservation) {
        return;
    }

    if (reservation.status === "Cancelled") {
        alert("This reservation is already cancelled.");
        return;
    }

    const confirmCancel = confirm(
        "Cancel reservation #" + reservation.reservationId + "?"
    );

    if (!confirmCancel) {
        return;
    }

    reservation.status = "Cancelled";

    localStorage.setItem(
        "reservations",
        JSON.stringify(reservations)
    );

    displayReservations();

    console.log(
        "Reservation cancelled:",
        reservation.reservationId
    );

});