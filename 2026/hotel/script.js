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
    const roomInventory = document.getElementById("roomInventory");

    if (loggedIn === "true") {

        staffLogin.textContent = "Logout";
        staffSignup.style.display = "none";
        roomInventory.style.display = "block";

    } else {

        staffLogin.textContent = "Staff Login";
        staffSignup.style.display = "inline-block";
        roomInventory.style.display = "none";

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
footer.innerHTML = '© ' + thisYear + ' Hotel Manager' + '<br/> Last worked on: Sunday November 15 2026';

// room prices
const roomPrices = {
    single: 79.99,
    double: 114.99,
    suite: 139.99 
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
// FINALIZE BOOKING

const confirmBooking = document.getElementById('confirmBooking');
const confirmationId = document.getElementById('confirmationId');


// FIND AN AVAILABLE ROOM

function findAvailableRoom(roomType, checkIn, checkOut) {

    // Find rooms matching the requested type

    const matchingRooms = rooms.filter(
        room => room.type === roomType
    );

    // Check each matching room

    for (const room of matchingRooms) {

        const roomIsOccupied = reservations.some(reservation => {

            // Cancelled reservations do not occupy rooms

            if (reservation.status === "Cancelled") {
                return false;
            }

            // Ignore reservations without an assigned physical room

            if (Number(reservation.roomNumber) !== Number(room.number)) {
                return false;
            }

            // Check whether the reservation dates overlap

            return (
                checkIn < reservation.checkOut &&
                checkOut > reservation.checkIn
            );

        });

        if (!roomIsOccupied) {
            return room;
        }

    }

    // No suitable room available

    return null;

}


// CONFIRM BOOKING

confirmBooking.addEventListener("click", () => {

    if (!currentBooking.guest) {
        alert("Please complete the guest information first.");
        return;
    }

  

    // Find an available physical room

    const availableRoom = findAvailableRoom(
        currentBooking.room,
        currentBooking.checkIn,
        currentBooking.checkOut
    );

    if (!availableRoom) {
        alert("Sorry, no rooms of this type are available for those dates.");
        return;
    }

    // Get the next reservation number

    let reservationNumber = localStorage.getItem("reservationNumber");

    if (reservationNumber === null) {
        reservationNumber = 1000;
    } else {
        reservationNumber = Number(reservationNumber) + 1;
    }

    // Assign the physical room

    currentBooking.roomNumber = availableRoom.number;

    // Add reservation number and status

    currentBooking.reservationId = reservationNumber;
    currentBooking.status = "Reserved";

    // Add booking to reservations array

    reservations.push(currentBooking);

    // Save everything

    localStorage.setItem("reservationNumber", reservationNumber);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    localStorage.setItem("currentBooking", JSON.stringify(currentBooking));

    // Display confirmation details

confirmationId.textContent = reservationNumber;

confirmGuest.textContent =
    currentBooking.guest.firstName + " " +
    currentBooking.guest.lastName;

confirmRoom.textContent =
    currentBooking.room + " - Room " + currentBooking.roomNumber;

confirmCheckIn.textContent = currentBooking.checkIn;
confirmCheckOut.textContent = currentBooking.checkOut;
confirmNights.textContent = currentBooking.nights;
confirmTotal.textContent = "$" + currentBooking.total.toFixed(2);

// Show confirmation

bookingConfirmation.style.display = "block";

console.log("Your booking is confirmed:", currentBooking);
console.log("All reservations:", reservations);

displayReservations();

// Clear stored booking data for the next reservation

currentBooking = {};

localStorage.removeItem("currentBooking");
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

lookupRoom.textContent =
    reservation.room + (reservation.roomNumber ? " - Room " + reservation.roomNumber : "");

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

// GET TODAY'S DATE IN LOCAL TIME

function getTodayDateString() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// DISPLAY RESERVATIONS

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
                ${reservation.room} ${reservation.roomNumber ? "- Room " + reservation.roomNumber : ""}
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
                    class="edit-reservation"
                    data-index="${index}">
                    Edit
                </button>
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
                
            ${(reservation.status || "Reserved") === "Reserved" ? `
            ${getTodayDateString() >= reservation.checkIn ? `
                <button class="check-in-btn" data-index="${index}">
                    Check In
                </button>
            ` : `
                <button class="check-in-btn" disabled>
                    Check In (Not Yet)
                </button>
            `}
        ` : ""}

        ${reservation.status === "Checked In" ? `
            ${getTodayDateString() >= reservation.checkOut ? `
                <button class="check-out-btn" data-index="${index}">
                    Check Out
                </button>
            ` : `
                <button class="check-out-btn" disabled>
                    Check Out (Not Yet)
                </button>
            `}
        ` : ""}

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


 // EDIT RESERVATION MODAL

const editReservationModal = document.getElementById("editReservationModal");
const editReservationForm = document.getElementById("editReservationForm");

const closeEditModal = document.getElementById("closeEditModal");
const cancelEditModal = document.getElementById("cancelEditModal");

let editingReservationIndex = null;


// OPEN EDIT MODAL

reservationsTableBody.addEventListener("click", (event) => {

    const editButton = event.target.closest(".edit-reservation");

    if (!editButton) {
        return;
    }

    editingReservationIndex = Number(editButton.dataset.index);

    const reservation = reservations[editingReservationIndex];

    if (!reservation) {
        return;
    }

    // Populate fields with existing reservation information

    document.getElementById("editFirstName").value =
        reservation.guest.firstName;

    document.getElementById("editLastName").value =
        reservation.guest.lastName;

    document.getElementById("editPhone").value =
        reservation.guest.phone;

    document.getElementById("editRoom").value =
        reservation.room;

    document.getElementById("editCheckIn").value =
        reservation.checkIn;

    document.getElementById("editCheckOut").value =
        reservation.checkOut;

    editReservationModal.style.display = "flex";

});


// CLOSE EDIT MODAL

function closeReservationEditor() {

    editReservationModal.style.display = "none";
    editingReservationIndex = null;

}

closeEditModal.addEventListener("click", closeReservationEditor);

cancelEditModal.addEventListener("click", closeReservationEditor);


// CLOSE WHEN CLICKING OUTSIDE MODAL

editReservationModal.addEventListener("click", (event) => {

    if (event.target === editReservationModal) {
        closeReservationEditor();
    }

});


// SAVE EDITED RESERVATION

editReservationForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (editingReservationIndex === null) {
        return;
    }

    const reservation = reservations[editingReservationIndex];

    if (!reservation) {
        return;
    }

    // Get updated information

    const firstName = document.getElementById("editFirstName").value.trim();
    const lastName = document.getElementById("editLastName").value.trim();
    const phone = document.getElementById("editPhone").value.trim();
    const room = document.getElementById("editRoom").value;

    const checkIn = document.getElementById("editCheckIn").value;
    const checkOut = document.getElementById("editCheckOut").value;

    // Validate dates

    if (!checkIn || !checkOut || checkOut <= checkIn) {
        alert("Check-out must be after check-in.");
        return;
    }

    // Calculate nights

    const startDate = new Date(checkIn + "T00:00:00Z");
    const endDate = new Date(checkOut + "T00:00:00Z");

    const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);

    // Calculate updated price

    const price = roomPrices[room];
    const subtotal = nights * price;
    const tax = 0;
    const total = subtotal + tax;

    // Update reservation

    reservation.guest = {
        firstName: firstName,
        lastName: lastName,
        phone: phone
    };

    reservation.room = room;
    reservation.checkIn = checkIn;
    reservation.checkOut = checkOut;
    reservation.nights = nights;
    reservation.price = price;
    reservation.subtotal = subtotal;
    reservation.tax = tax;
    reservation.total = total;

    // Save changes

    localStorage.setItem(
        "reservations",
        JSON.stringify(reservations)
    );

    // Refresh dashboard and close modal

    displayReservations();

    closeReservationEditor();

    alert("Reservation #" + reservation.reservationId + " updated successfully!");

});


// GUEST CHECK-IN AND CHECK-OUT

reservationsTableBody.addEventListener("click", (event) => {

    const checkInButton = event.target.closest(".check-in-btn");
    const checkOutButton = event.target.closest(".check-out-btn");

    // CHECK IN

    if (checkInButton) {
        const index = Number(checkInButton.dataset.index);
        const reservation = reservations[index];

        if (!reservation || (reservation.status || "Reserved") !== "Reserved") {
            return;
        }

        if (getTodayDateString() < reservation.checkIn) {
            alert("This guest cannot check in before their reservation date.");
            return;
        }

        const confirmCheckIn = confirm(
            `Check in ${reservation.guest.firstName} ${reservation.guest.lastName}?`
        );

        if (!confirmCheckIn) {
            return;
        }

        reservation.status = "Checked In";

        localStorage.setItem(
            "reservations",
            JSON.stringify(reservations)
        );

        displayReservations();

        alert("Guest successfully checked in!");

        return;
    }

    // CHECK OUT

    if (checkOutButton) {
        const index = Number(checkOutButton.dataset.index);
        const reservation = reservations[index];

        if (!reservation || reservation.status !== "Checked In") {
        return;
    }

    if (getTodayDateString() < reservation.checkOut) {
    alert("This guest cannot check out before their scheduled checkout date.");
    return;
}

        reservation.status = "Checked Out";

        localStorage.setItem(
            "reservations",
            JSON.stringify(reservations)
        );

        displayReservations();

        alert("Guest successfully checked out!");

    }

});


// ROOM INVENTORY MANAGEMENT

let rooms = JSON.parse(localStorage.getItem("rooms")) || [];

const roomNumberInput = document.getElementById("roomNumberInput");
const roomTypeInput = document.getElementById("roomTypeInput");
const saveRoomButton = document.getElementById("saveRoomButton");
const cancelRoomEdit = document.getElementById("cancelRoomEdit");
const roomInventoryTableBody = document.getElementById("roomInventoryTableBody");
const noRoomsMessage = document.getElementById("noRoomsMessage");
const roomFormTitle = document.getElementById("roomFormTitle");

let editingRoomNumber = null;


// SAVE ROOMS

function saveRooms() {

    localStorage.setItem("rooms", JSON.stringify(rooms));

}


// DISPLAY ROOM INVENTORY

function displayRooms() {

    roomInventoryTableBody.innerHTML = "";

    if (rooms.length === 0) {

        noRoomsMessage.style.display = "block";
        return;

    }

    noRoomsMessage.style.display = "none";

    // Sort rooms by room number

    rooms.sort((a, b) => a.number - b.number);

    rooms.forEach((room) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${room.number}</td>

            <td>${room.type.charAt(0).toUpperCase() + room.type.slice(1)}</td>

            <td>
                <button
                    class="edit-room-btn"
                    data-room-number="${room.number}">
                    Edit
                </button>

                <button
                    class="delete-room-btn"
                    data-room-number="${room.number}">
                    Delete
                </button>
            </td>
        `;

        roomInventoryTableBody.appendChild(row);

    });

}


// ADD OR UPDATE ROOM

saveRoomButton.addEventListener("click", () => {

    const roomNumber = Number(roomNumberInput.value);
    const roomType = roomTypeInput.value;

    if (!roomNumber || roomNumber < 1 || !Number.isInteger(roomNumber)) {

        alert("Please enter a valid room number.");
        return;

    }

    if (!roomType) {

        alert("Please select a room type.");
        return;

    }

    // ADD NEW ROOM

    if (editingRoomNumber === null) {

        const roomExists = rooms.some(
            room => Number(room.number) === roomNumber
        );

        if (roomExists) {

            alert("That room number already exists.");
            return;

        }

        rooms.push({
            number: roomNumber,
            type: roomType
        });

        // alert("Room added successfully!");

    } else {

        // UPDATE EXISTING ROOM

        const room = rooms.find(
            room => Number(room.number) === Number(editingRoomNumber)
        );

        if (!room) {
            return;
        }

        const roomNumberExists = rooms.some(
            existingRoom =>
                Number(existingRoom.number) === roomNumber &&
                Number(existingRoom.number) !== Number(editingRoomNumber)
        );

        if (roomNumberExists) {

            alert("That room number already exists.");
            return;

        }

        room.number = roomNumber;
        room.type = roomType;

        // alert("Room updated successfully!");

    }

    saveRooms();
    displayRooms();
    resetRoomForm();

});


// EDIT OR DELETE ROOM

roomInventoryTableBody.addEventListener("click", (event) => {

    const editButton = event.target.closest(".edit-room-btn");
    const deleteButton = event.target.closest(".delete-room-btn");

    // EDIT ROOM

    if (editButton) {

        const roomNumber = Number(editButton.dataset.roomNumber);

        const room = rooms.find(
            room => Number(room.number) === roomNumber
        );

        if (!room) {
            return;
        }

        editingRoomNumber = roomNumber;

        roomNumberInput.value = room.number;
        roomTypeInput.value = room.type;

        roomFormTitle.textContent = "Edit Room";
        saveRoomButton.textContent = "Save Changes";
        cancelRoomEdit.style.display = "inline-block";

        roomNumberInput.focus();

        return;

    }

    // DELETE ROOM

    if (deleteButton) {

        const roomNumber = Number(deleteButton.dataset.roomNumber);

        const confirmDelete = confirm(
            `Are you sure you want to delete Room ${roomNumber}?`
        );

        if (!confirmDelete) {
            return;
        }

        rooms = rooms.filter(
            room => Number(room.number) !== roomNumber
        );

        saveRooms();
        displayRooms();
        resetRoomForm();

        // alert("Room deleted successfully!");

    }

});


// CANCEL ROOM EDIT / RESET FORM

function resetRoomForm() {

    editingRoomNumber = null;

    roomNumberInput.value = "";
    roomTypeInput.value = "";

    roomFormTitle.textContent = "Add New Room";
    saveRoomButton.textContent = "Add Room";

    cancelRoomEdit.style.display = "none";

}

cancelRoomEdit.addEventListener("click", resetRoomForm);


// DISPLAY ROOMS WHEN PAGE LOADS

displayRooms();

// END ROOM INVENTORY MANAGEMENT
