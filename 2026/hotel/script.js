
/* =========================================================
   HOTEL MANAGER
   Main Application JavaScript
========================================================= */


/* =========================================================
   1. INITIAL SETUP
========================================================= */


// GET TODAY'S DATE IN LOCAL TIME

function getTodayDateString() {

    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


// SET DEFAULT BOOKING DATES

const today = new Date();

const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

document.getElementById("checkIn").value =
    today.toISOString().split("T")[0];

document.getElementById("checkOut").value =
    tomorrow.toISOString().split("T")[0];


// UPDATE FOOTER YEAR

const footer = document.getElementById("footer");
const thisYear = new Date().getFullYear();

footer.innerHTML =
    "© " + thisYear + " Hotel Manager" +
    "<br/> V1.0 Completed on 11/17/2026";


// ROOM BASE PRICES

const roomPrices = {
    single: 79.99,
    double: 114.99,
    suite: 139.99
};


// DISPLAY ROOM PRICES

document.getElementById("singlePrice").textContent =
    "$" + roomPrices.single + "/night";

document.getElementById("doublePrice").textContent =
    "$" + roomPrices.double + "/night";

document.getElementById("suitePrice").textContent =
    "$" + roomPrices.suite + "/night";



/* =========================================================
   2. SHARED APPLICATION DATA
========================================================= */


let currentBooking = {};

let reservations =
    JSON.parse(localStorage.getItem("reservations")) || [];

let rooms =
    JSON.parse(localStorage.getItem("rooms")) || [];

let confirmedReservationId = null;



/* =========================================================
   3. BOOKING WORKFLOW
========================================================= */


// BOOKING ELEMENTS

const searchButton = document.getElementById("searchDate");
const roomDropDown = document.getElementById("roomDropDown");
const bookingBar = document.querySelector(".booking-bar");

const bookingSearch = document.getElementById("bookingSearch");
const bookingAvailability = document.getElementById("bookingAvailability");
const guestForm = document.getElementById("guestForm");
const bookingReview = document.getElementById("bookingReview");
const bookingSuccess = document.getElementById("bookingSuccess");

const proceedToGuest = document.getElementById("proceedToGuest");
const continueBooking = document.getElementById("continueBooking");
const confirmBooking = document.getElementById("confirmBooking");
const bookAnotherRoom = document.getElementById("bookAnotherRoom");
const editConfirmedBooking = document.getElementById("editConfirmedBooking");


// CUSTOMER EDIT BOOKING MODAL ELEMENTS

const confirmedBookingEditModal =
    document.getElementById("confirmedBookingEditModal");

const confirmedBookingEditForm =
    document.getElementById("confirmedBookingEditForm");

const closeConfirmedEditModal =
    document.getElementById("closeConfirmedEditModal");

const cancelConfirmedEditModal =
    document.getElementById("cancelConfirmedEditModal");


// UPDATE BOOKING SUMMARY

function updateBookingSummary(
    selectedRoom,
    checkInValue,
    checkOutValue,
    days,
    price
) {

    document.getElementById("summaryRoom").textContent =
        selectedRoom;

    document.getElementById("summaryCheckIn").textContent =
        checkInValue;

    document.getElementById("summaryCheckOut").textContent =
        checkOutValue;

    document.getElementById("summaryNights").textContent =
        days;

    document.getElementById("summaryPrice").textContent =
        "$" + price.toFixed(2);

    const total = days * price;

    document.getElementById("summaryTotal").textContent =
        "$" + total.toFixed(2);

}


// DISPLAY FINAL BOOKING REVIEW

function displayBookingReview() {

    const guest = currentBooking.guest;

    document.getElementById("confirmationGuest").textContent =
        guest.firstName + " " + guest.lastName;

    document.getElementById("confirmationRoom").textContent =
        currentBooking.room;

    document.getElementById("confirmationCheckIn").textContent =
        currentBooking.checkIn;

    document.getElementById("confirmationCheckOut").textContent =
        currentBooking.checkOut;

    document.getElementById("confirmationNights").textContent =
        currentBooking.nights;

    document.getElementById("confirmationPrice").textContent =
        "$" + currentBooking.price.toFixed(2);

    document.getElementById("confirmationTotal").textContent =
        "$" + currentBooking.total.toFixed(2);

}


// SEARCH FOR A ROOM

searchButton.addEventListener("click", () => {

    const selectedRoom = roomDropDown.value;

    if (!selectedRoom) {
        alert("You've not entered a room type!");
        return;
    }

    const checkInValue =
        document.getElementById("checkIn").value;

    const checkOutValue =
        document.getElementById("checkOut").value;

    if (!checkInValue || !checkOutValue) {
        alert("Please select both dates.");
        return;
    }

    if (checkInValue < getTodayDateString()) {
        alert("Error! Check-in date cannot be before today!");
        return;
    }

    if (checkOutValue <= checkInValue) {
        alert("Error! Check-out date must be after check-in date!");
        return;
    }

    const checkInDate =
        new Date(checkInValue + "T00:00:00Z");

    const checkOutDate =
        new Date(checkOutValue + "T00:00:00Z");

    const nights = Math.round(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    // Check availability and calculate nightly price.

    const price = getDynamicRoomPrice(
        selectedRoom,
        checkInValue,
        checkOutValue
    );

    if (price === null) {
        alert("Sorry, no rooms of this type are available for those dates.");
        return;
    }

    const subtotal = Number((nights * price).toFixed(2));
    const tax = 0;
    const total = subtotal + tax;

    currentBooking = {
        room: selectedRoom,
        checkIn: checkInValue,
        checkOut: checkOutValue,
        nights: nights,
        price: price,
        subtotal: subtotal,
        tax: tax,
        total: total
    };

    // Display availability and pricing before guest information.

    updateBookingSummary(
        selectedRoom,
        checkInValue,
        checkOutValue,
        nights,
        price
    );

    // Clear previous guest information.

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phone").value = "";

    // Show availability and pricing stage.

    bookingSearch.style.display = "none";
    bookingAvailability.style.display = "block";
    guestForm.style.display = "none";
    bookingReview.style.display = "none";
    bookingSuccess.style.display = "none";

    bookingAvailability.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// CONTINUE TO GUEST INFORMATION

proceedToGuest.addEventListener("click", () => {

    if (!currentBooking.room) {
        alert("Please search for an available room first.");
        return;
    }

    bookingAvailability.style.display = "none";
    guestForm.style.display = "block";

    guestForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// CONTINUE TO FINAL BOOKING REVIEW

continueBooking.addEventListener("click", () => {

    if (!currentBooking.room) {
        alert("Please search for an available room first.");
        return;
    }

    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    if (!firstName || !lastName || !phone) {
        alert("Please enter all guest information.");
        return;
    }

    currentBooking.guest = {
        firstName: firstName,
        lastName: lastName,
        phone: phone
    };

    displayBookingReview();

    // Show final review.

    guestForm.style.display = "none";
    bookingReview.style.display = "block";

    bookingReview.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// CONFIRM NEW BOOKING

confirmBooking.addEventListener("click", () => {

    if (!currentBooking.guest || !currentBooking.room) {
        alert("Please complete the booking information first.");
        return;
    }

    // Check availability again before confirming.

    const availableRoom = findAvailableRoom(
        currentBooking.room,
        currentBooking.checkIn,
        currentBooking.checkOut
    );

    if (!availableRoom) {
        alert("Sorry, this room is no longer available for those dates. Please start a new search.");
        return;
    }

    // Generate the next reservation number.

    let reservationNumber =
        localStorage.getItem("reservationNumber");

    if (reservationNumber === null) {
        reservationNumber = 1000;
    } else {
        reservationNumber = Number(reservationNumber) + 1;
    }

    currentBooking.roomNumber = availableRoom.number;
    currentBooking.reservationId = reservationNumber;
    currentBooking.status = "Reserved";

    // Save the confirmed reservation.

    reservations.push(currentBooking);

    localStorage.setItem("reservationNumber", reservationNumber);
    localStorage.setItem("reservations", JSON.stringify(reservations));

    // Remember which reservation the success screen belongs to.

    confirmedReservationId = reservationNumber;

    // Display successful booking details.

    document.getElementById("confirmationId").textContent =
        reservationNumber;

    document.getElementById("successGuest").textContent =
        currentBooking.guest.firstName + " " +
        currentBooking.guest.lastName;

    document.getElementById("successRoom").textContent =
        currentBooking.room + " - Room " + currentBooking.roomNumber;

    document.getElementById("successCheckIn").textContent =
        currentBooking.checkIn;

    document.getElementById("successCheckOut").textContent =
        currentBooking.checkOut;

    document.getElementById("successNights").textContent =
        currentBooking.nights;

    document.getElementById("successTotal").textContent =
        "$" + currentBooking.total.toFixed(2);

    // Clear temporary booking data.

    currentBooking = {};

    localStorage.removeItem("currentBooking");

    // Show successful booking stage.

    bookingSearch.style.display = "none";
    guestForm.style.display = "none";
    bookingReview.style.display = "none";
    bookingSuccess.style.display = "block";

    displayReservations();

    bookingSuccess.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    console.log("Booking confirmed:", reservationNumber);

});


// BOOK ANOTHER ROOM

bookAnotherRoom.addEventListener("click", () => {

    currentBooking = {};
    confirmedReservationId = null;

    localStorage.removeItem("currentBooking");

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phone").value = "";

    roomDropDown.value = "";

    document.getElementById("checkIn").value =
        getTodayDateString();

    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);

    const nextDayString =
        `${nextDay.getFullYear()}-${String(nextDay.getMonth() + 1).padStart(2, "0")}-${String(nextDay.getDate()).padStart(2, "0")}`;

    document.getElementById("checkOut").value =
        nextDayString;

    bookingSearch.style.display = "block";
    guestForm.style.display = "none";
    bookingReview.style.display = "none";
    bookingSuccess.style.display = "none";

    bookingSearch.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// OPEN CUSTOMER EDIT BOOKING MODAL

editConfirmedBooking.addEventListener("click", () => {

    const reservation = reservations.find(
        item => Number(item.reservationId) === Number(confirmedReservationId)
    );

    if (!reservation || reservation.status !== "Reserved") {
        alert("This booking can no longer be edited here.");
        return;
    }

    document.getElementById("confirmedEditFirstName").value =
        reservation.guest.firstName;

    document.getElementById("confirmedEditLastName").value =
        reservation.guest.lastName;

    document.getElementById("confirmedEditPhone").value =
        reservation.guest.phone;

    document.getElementById("confirmedEditRoom").value =
        reservation.room;

    document.getElementById("confirmedEditCheckIn").value =
        reservation.checkIn;

    document.getElementById("confirmedEditCheckOut").value =
        reservation.checkOut;

    confirmedBookingEditModal.style.display = "flex";

});


// CLOSE CUSTOMER EDIT BOOKING MODAL

function closeConfirmedBookingEditor() {

    confirmedBookingEditModal.style.display = "none";

}

closeConfirmedEditModal.addEventListener(
    "click",
    closeConfirmedBookingEditor
);

cancelConfirmedEditModal.addEventListener(
    "click",
    closeConfirmedBookingEditor
);

confirmedBookingEditModal.addEventListener("click", (event) => {

    if (event.target === confirmedBookingEditModal) {
        closeConfirmedBookingEditor();
    }

});


// SAVE CUSTOMER EDITED BOOKING

confirmedBookingEditForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const reservation = reservations.find(
        item => Number(item.reservationId) === Number(confirmedReservationId)
    );

    if (!reservation || reservation.status !== "Reserved") {
        alert("This booking can no longer be edited.");
        closeConfirmedBookingEditor();
        return;
    }

    const firstName =
        document.getElementById("confirmedEditFirstName").value.trim();

    const lastName =
        document.getElementById("confirmedEditLastName").value.trim();

    const phone =
        document.getElementById("confirmedEditPhone").value.trim();

    const room =
        document.getElementById("confirmedEditRoom").value;

    const checkIn =
        document.getElementById("confirmedEditCheckIn").value;

    const checkOut =
        document.getElementById("confirmedEditCheckOut").value;

    if (!firstName || !lastName || !phone || !room) {
        alert("Please complete all guest and room information.");
        return;
    }

    if (!checkIn || !checkOut || checkOut <= checkIn) {
        alert("Check-out must be after check-in.");
        return;
    }

    if (checkIn < getTodayDateString()) {
        alert("Check-in date cannot be before today.");
        return;
    }

    // Check availability without counting this reservation against itself.

    const availableRoom = findAvailableRoom(
        room,
        checkIn,
        checkOut,
        reservation.reservationId
    );

    if (!availableRoom) {
        alert("Sorry, no rooms of this type are available for those dates.");
        return;
    }

    const bookingDetailsChanged =
        room !== reservation.room ||
        checkIn !== reservation.checkIn ||
        checkOut !== reservation.checkOut;

    let price;

    if (bookingDetailsChanged) {

        price = getDynamicRoomPrice(
            room,
            checkIn,
            checkOut,
            reservation.reservationId
        );

        if (price === null) {
            alert("Sorry, no rooms of this type are available for those dates.");
            return;
        }

    } else {

        // Keep the original agreed price if only guest details changed.

        price = reservation.price;

    }

    const startDate = new Date(checkIn + "T00:00:00Z");
    const endDate = new Date(checkOut + "T00:00:00Z");

    const nights = Math.round(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

    const subtotal = Number((nights * price).toFixed(2));
    const tax = 0;
    const total = subtotal + tax;

    // Update the existing reservation. Its number stays the same.

    reservation.guest = {
        firstName: firstName,
        lastName: lastName,
        phone: phone
    };

    reservation.room = room;
    reservation.roomNumber = availableRoom.number;
    reservation.checkIn = checkIn;
    reservation.checkOut = checkOut;
    reservation.nights = nights;
    reservation.price = price;
    reservation.subtotal = subtotal;
    reservation.tax = tax;
    reservation.total = total;

    localStorage.setItem(
        "reservations",
        JSON.stringify(reservations)
    );

    // Refresh the success screen with updated details.

    document.getElementById("successGuest").textContent =
        firstName + " " + lastName;

    document.getElementById("successRoom").textContent =
        room + " - Room " + availableRoom.number;

    document.getElementById("successCheckIn").textContent =
        checkIn;

    document.getElementById("successCheckOut").textContent =
        checkOut;

    document.getElementById("successNights").textContent =
        nights;

    document.getElementById("successTotal").textContent =
        "$" + total.toFixed(2);

    displayReservations();

    closeConfirmedBookingEditor();

    alert("Your booking has been updated successfully.");

});


// ROOM CARD BOOK NOW BUTTONS

const singleBook = document.getElementById("singleBook");
const doubleBook = document.getElementById("doubleBook");
const suiteBook = document.getElementById("suiteBook");

singleBook.addEventListener("click", () => {

    roomDropDown.value = "single";

    bookingBar.scrollIntoView({
        behavior: "smooth"
    });

});

doubleBook.addEventListener("click", () => {

    roomDropDown.value = "double";

    bookingBar.scrollIntoView({
        behavior: "smooth"
    });

});

suiteBook.addEventListener("click", () => {

    roomDropDown.value = "suite";

    bookingBar.scrollIntoView({
        behavior: "smooth"
    });

});



/* =========================================================
   4. ROOM AVAILABILITY & DYNAMIC PRICING
========================================================= */


// FIND AN AVAILABLE PHYSICAL ROOM

function findAvailableRoom(
    roomType,
    checkIn,
    checkOut,
    excludedReservationId = null
) {

    const matchingRooms = rooms.filter(
        room => room.type === roomType
    );

    for (const room of matchingRooms) {

        const roomIsOccupied = reservations.some(reservation => {

            // Ignore the reservation currently being edited.

            if (
                excludedReservationId !== null &&
                Number(reservation.reservationId) === Number(excludedReservationId)
            ) {
                return false;
            }

            // Cancelled reservations do not occupy rooms.

            if (reservation.status === "Cancelled") {
                return false;
            }

            // Ignore reservations assigned to other physical rooms.

            if (Number(reservation.roomNumber) !== Number(room.number)) {
                return false;
            }

            // Account for guests who checked in before their scheduled date.

            const occupiedFrom =
                reservation.status === "Checked In" &&
                reservation.checkIn > getTodayDateString()
                    ? getTodayDateString()
                    : reservation.checkIn;

            // Check whether reservation dates overlap.

            return (
                checkIn < reservation.checkOut &&
                checkOut > occupiedFrom
            );

        });

        if (!roomIsOccupied) {
            return room;
        }

    }

    return null;

}


// CHECK ROOM AVAILABILITY FOR SELECTED DATES

function getRoomAvailability(
    roomType,
    checkIn,
    checkOut,
    excludedReservationId = null
) {

    const matchingRooms = rooms.filter(
        room => room.type === roomType
    );

    let availableRooms = 0;

    matchingRooms.forEach(room => {

        const roomIsOccupied = reservations.some(reservation => {

            // Ignore the reservation currently being edited.

            if (
                excludedReservationId !== null &&
                Number(reservation.reservationId) === Number(excludedReservationId)
            ) {
                return false;
            }

            // Cancelled reservations do not occupy rooms.

            if (reservation.status === "Cancelled") {
                return false;
            }

            // Check physical room number.

            if (Number(reservation.roomNumber) !== Number(room.number)) {
                return false;
            }

            // Account for guests who checked in before their scheduled date.

            const occupiedFrom =
                reservation.status === "Checked In" &&
                reservation.checkIn > getTodayDateString()
                    ? getTodayDateString()
                    : reservation.checkIn;

            // Check whether reservation dates overlap.

            return (
                checkIn < reservation.checkOut &&
                checkOut > occupiedFrom
            );

        });

        if (!roomIsOccupied) {
            availableRooms++;
        }

    });

    return {
        totalRooms: matchingRooms.length,
        availableRooms: availableRooms
    };

}


// CALCULATE DYNAMIC ROOM PRICE

function getDynamicRoomPrice(
    roomType,
    checkIn,
    checkOut,
    excludedReservationId = null
) {

    const availability = getRoomAvailability(
        roomType,
        checkIn,
        checkOut,
        excludedReservationId
    );

    // No inventory or no available rooms.

    if (
        availability.totalRooms === 0 ||
        availability.availableRooms === 0
    ) {
        return null;
    }

    const availabilityPercentage =
        (availability.availableRooms / availability.totalRooms) * 100;

    let price = roomPrices[roomType];

    // Apply pricing adjustments.

    if (availabilityPercentage >= 80) {

        price *= 0.90;

    } else if (availabilityPercentage >= 50) {

        // Base price remains unchanged.

    } else if (availabilityPercentage >= 30) {

        price *= 1.10;

    } else {

        price *= 1.20;

    }

    // Round to two decimal places.

    return Number(price.toFixed(2));

}



/* =========================================================
   5. RESERVATION LOOKUP
========================================================= */


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


// LOOK UP RESERVATION

lookupButton.addEventListener("click", () => {

    const reservationNumber = Number(
        document.getElementById("reservationLookup").value
    );

    if (!reservationNumber) {
        alert("Please enter a reservation number.");
        return;
    }

    const reservation = reservations.find(
        booking => Number(booking.reservationId) === reservationNumber
    );

    if (!reservation) {
        alert("Reservation not found.");
        lookupResult.style.display = "none";
        return;
    }

    // Display reservation details.

    lookupReservationId.textContent =
        reservation.reservationId;

    lookupGuest.textContent =
        reservation.guest.firstName + " " + reservation.guest.lastName;

    lookupPhone.textContent =
        reservation.guest.phone;

    lookupRoom.textContent =
        reservation.room +
        (reservation.roomNumber ? " - Room " + reservation.roomNumber : "");

    lookupCheckIn.textContent =
        reservation.actualCheckIn || reservation.checkIn;

    lookupCheckOut.textContent =
        reservation.checkOut;

    lookupNights.textContent =
        reservation.nights;

    lookupTotal.textContent =
        "$" + reservation.total.toFixed(2);

    lookupResult.style.display = "block";

    lookupResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});



/* =========================================================
   6. RESERVATIONS DASHBOARD
========================================================= */


const reservationsTableBody =
    document.getElementById("reservationsTableBody");

const noReservations =
    document.getElementById("noReservations");

const deleteAllReservations =
    document.getElementById("deleteAllReservations");


// DISPLAY RESERVATIONS

function displayReservations() {

    reservationsTableBody.innerHTML = "";

    // Check if there are any reservations.

    if (reservations.length === 0) {

        noReservations.style.display = "block";

        return;
    }

    noReservations.style.display = "none";

    // Create a row for each reservation.

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
                ${reservation.actualCheckIn || reservation.checkIn}
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
                ${(reservation.status || "Reserved") !== "Cancelled" ? `
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
                ` : ""}

                <button
                    class="delete-reservation"
                    data-index="${index}">
                    Delete
                </button>

                ${(reservation.status || "Reserved") === "Reserved" ? `
                    <button
                        class="check-in-btn"
                        data-index="${index}">
                        Check In
                    </button>
                ` : ""}

                ${reservation.status === "Checked In" ? `
                    <button
                        class="check-out-btn"
                        data-index="${index}">
                        Check Out
                    </button>
                ` : ""}
            </td>
        `;

        reservationsTableBody.appendChild(row);

    });

}


// DISPLAY RESERVATIONS WHEN PAGE LOADS

displayReservations();


// DELETE INDIVIDUAL RESERVATION

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

    // Remove reservation from array.

    reservations.splice(index, 1);

    // Save updated array.

    localStorage.setItem(
        "reservations",
        JSON.stringify(reservations)
    );

    displayReservations();

});


// CANCEL INDIVIDUAL RESERVATION

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


// DELETE ALL RESERVATIONS

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

    // Reset reservation numbering.

    localStorage.removeItem("reservationNumber");

    displayReservations();

    confirmationId.textContent = "";

    alert("All reservations have been deleted. The next reservation will be #1000.");

    console.log("All reservations deleted.");
    console.log("Reservation number reset to 1000.");

});



/* =========================================================
   7. ADMIN RESERVATION EDITING
========================================================= */


const editReservationModal =
    document.getElementById("editReservationModal");

const editReservationForm =
    document.getElementById("editReservationForm");

const closeEditModal =
    document.getElementById("closeEditModal");

const cancelEditModal =
    document.getElementById("cancelEditModal");

let editingReservationIndex = null;


// OPEN EDIT RESERVATION MODAL

reservationsTableBody.addEventListener("click", (event) => {

    const editButton = event.target.closest(".edit-reservation");

    if (!editButton) {
        return;
    }

    editingReservationIndex = Number(editButton.dataset.index);

    const reservation = reservations[editingReservationIndex];

    if (!reservation || reservation.status === "Cancelled") {
        return;
    }

    // Populate fields with existing reservation information.

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


// CLOSE ADMIN EDIT RESERVATION MODAL

function closeReservationEditor() {

    editReservationModal.style.display = "none";
    editingReservationIndex = null;

}

closeEditModal.addEventListener(
    "click",
    closeReservationEditor
);

cancelEditModal.addEventListener(
    "click",
    closeReservationEditor
);


// CLOSE MODAL WHEN CLICKING OUTSIDE

editReservationModal.addEventListener("click", (event) => {

    if (event.target === editReservationModal) {
        closeReservationEditor();
    }

});


// SAVE EDITED RESERVATION

editReservationForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const reservation = reservations[editingReservationIndex];

    if (!reservation) {
        return;
    }

    if (reservation.status === "Cancelled") {
        alert("Cancelled reservations cannot be edited.");
        closeReservationEditor();
        return;
    }

    // Get updated information.

    const firstName =
        document.getElementById("editFirstName").value.trim();

    const lastName =
        document.getElementById("editLastName").value.trim();

    const phone =
        document.getElementById("editPhone").value.trim();

    const room =
        document.getElementById("editRoom").value;

    const checkIn =
        document.getElementById("editCheckIn").value;

    const checkOut =
        document.getElementById("editCheckOut").value;

    // Validate guest information.

    if (!firstName || !lastName || !phone || !room) {
        alert("Please complete all guest and room information.");
        return;
    }

    // Validate dates.

    if (!checkIn || !checkOut || checkOut <= checkIn) {
        alert("Check-out must be after check-in.");
        return;
    }

    // Find an available physical room.

    const availableRoom = findAvailableRoom(
        room,
        checkIn,
        checkOut,
        reservation.reservationId
    );

    if (!availableRoom) {
        alert("Sorry, no rooms of this type are available for those dates.");
        return;
    }

    // Calculate nights.

    const startDate = new Date(checkIn + "T00:00:00Z");
    const endDate = new Date(checkOut + "T00:00:00Z");

    const nights =
        (endDate - startDate) / (1000 * 60 * 60 * 24);

    // Check whether room type or dates have changed.

    const bookingDetailsChanged =
        room !== reservation.room ||
        checkIn !== reservation.checkIn ||
        checkOut !== reservation.checkOut;

    // Calculate updated price.

    let price;

    if (bookingDetailsChanged) {

        price = getDynamicRoomPrice(
            room,
            checkIn,
            checkOut,
            reservation.reservationId
        );

        if (price === null) {
            alert("Sorry, no rooms of this type are available for those dates.");
            return;
        }

    } else {

        // Keep the guest's original agreed price.

        price = reservation.price ?? roomPrices[room];

    }

    const subtotal = Number((nights * price).toFixed(2));
    const tax = 0;
    const total = subtotal + tax;

    // Update reservation.

    reservation.guest = {
        firstName: firstName,
        lastName: lastName,
        phone: phone
    };

    reservation.room = room;
    reservation.roomNumber = availableRoom.number;
    reservation.checkIn = checkIn;
    reservation.checkOut = checkOut;
    reservation.nights = nights;
    reservation.price = price;
    reservation.subtotal = subtotal;
    reservation.tax = tax;
    reservation.total = total;

    // Save changes.

    localStorage.setItem(
        "reservations",
        JSON.stringify(reservations)
    );

    // Refresh dashboard and close modal.

    displayReservations();

    closeReservationEditor();

    alert("Reservation #" + reservation.reservationId + " updated successfully!");

});



/* =========================================================
   8. GUEST CHECK-IN & CHECK-OUT
========================================================= */


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

        const today = getTodayDateString();

        // Make sure the assigned physical room still exists.

        const assignedRoom = rooms.find(
            room => Number(room.number) === Number(reservation.roomNumber)
        );

        if (!assignedRoom) {
            alert("The room assigned to this reservation no longer exists.");
            return;
        }

        // Check whether another reservation occupies this physical room.

        const roomIsOccupied = reservations.some(otherReservation => {

            if (
                Number(otherReservation.reservationId) ===
                Number(reservation.reservationId)
            ) {
                return false;
            }

            const status = otherReservation.status || "Reserved";

            if (status === "Cancelled" || status === "Checked Out") {
                return false;
            }

            if (
                Number(otherReservation.roomNumber) !==
                Number(reservation.roomNumber)
            ) {
                return false;
            }

            return (
                today < otherReservation.checkOut &&
                reservation.checkOut > otherReservation.checkIn
            );

        });

        if (roomIsOccupied) {
            alert("This room is currently occupied or has another reservation during the requested stay. Check-in cannot proceed.");
            return;
        }

        const confirmCheckIn = confirm(
            `Check in ${reservation.guest.firstName} ${reservation.guest.lastName}?`
        );

        if (!confirmCheckIn) {
            return;
        }

        reservation.actualCheckIn = today;
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

        const today = getTodayDateString();

        const checkInDate = new Date(
            (reservation.actualCheckIn || reservation.checkIn) + "T00:00:00Z"
        );

        const checkOutDate = new Date(today + "T00:00:00Z");

        const nights = Math.max(
            1,
            Math.round(
                (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
            )
        );

        const price = Number(
            reservation.price ?? roomPrices[reservation.room]
        );

        const subtotal = Number((nights * price).toFixed(2));
        const tax = 0;
        const total = subtotal + tax;

        reservation.checkOut = today;
        reservation.nights = nights;
        reservation.price = price;
        reservation.subtotal = subtotal;
        reservation.tax = tax;
        reservation.total = total;
        reservation.status = "Checked Out";

        localStorage.setItem(
            "reservations",
            JSON.stringify(reservations)
        );

        displayReservations();

        alert("Guest successfully checked out!");

    }

});



/* =========================================================
   9. ROOM INVENTORY MANAGEMENT
========================================================= */


// ROOM INVENTORY ELEMENTS

const roomNumberInput =
    document.getElementById("roomNumberInput");

const roomTypeInput =
    document.getElementById("roomTypeInput");

const saveRoomButton =
    document.getElementById("saveRoomButton");

const cancelRoomEdit =
    document.getElementById("cancelRoomEdit");

const roomInventoryTableBody =
    document.getElementById("roomInventoryTableBody");

const noRoomsMessage =
    document.getElementById("noRoomsMessage");

const roomFormTitle =
    document.getElementById("roomFormTitle");

let editingRoomNumber = null;


// CHECK IF ROOM HAS AN ACTIVE RESERVATION

function roomHasActiveReservations(roomNumber) {

    return reservations.some(reservation => {

        const status = reservation.status || "Reserved";

        const isActive =
            status === "Reserved" ||
            status === "Checked In";

        return (
            Number(reservation.roomNumber) === Number(roomNumber) &&
            isActive
        );

    });

}


// SAVE ROOMS TO LOCAL STORAGE

function saveRooms() {

    localStorage.setItem(
        "rooms",
        JSON.stringify(rooms)
    );

}


// DISPLAY ROOM INVENTORY

function displayRooms() {

    roomInventoryTableBody.innerHTML = "";

    if (rooms.length === 0) {

        noRoomsMessage.style.display = "block";

        return;

    }

    noRoomsMessage.style.display = "none";

    // Sort rooms by room number.

    rooms.sort((a, b) => a.number - b.number);

    rooms.forEach(room => {

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

    } else {


        // UPDATE EXISTING ROOM

        if (roomHasActiveReservations(editingRoomNumber)) {
            alert("This room cannot be edited because it has an active reservation.");
            return;
        }

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

        if (roomHasActiveReservations(roomNumber)) {
            alert("This room cannot be edited because it has an active reservation.");
            return;
        }

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

        if (roomHasActiveReservations(roomNumber)) {
            alert("This room cannot be deleted because it has an active reservation.");
            return;
        }

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

cancelRoomEdit.addEventListener(
    "click",
    resetRoomForm
);


// DISPLAY ROOMS WHEN PAGE LOADS

displayRooms();


// END ROOM INVENTORY MANAGEMENT


/* =========================================================
   END OF HOTEL MANAGER SCRIPT
   Completed 11/17/2026 V1.0
========================================================= */
