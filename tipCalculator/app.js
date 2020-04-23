// UI Elements

// Input for bill amount
const billAmount = document.getElementById('bill-amount');
// Select for how service was
const service = document.getElementById('service');
// Button
const calculateTip = document.getElementById('calculateTip');

let parsedBillAmount;
let tipAmount;
let total;

// Event Listener
calculateTip.addEventListener('click', function(e) {
    if (isNaN(billAmount.value) || billAmount.value == null || billAmount.value == "") {
        alert('You must enter a number!');
    } else {
        calculate();
        changeUI();    
    }
    
    e.preventDefault();
});

// Calculate Function
const calculate = () => {
    parsedBillAmount = parseFloat(billAmount.value);
    // TIP AMOUNT
    tipAmount = parsedBillAmount * service.value;

    // TOTAL
    total = parsedBillAmount + tipAmount;
 }

// Change UI To Show Calculations 
const changeUI = () => {
    document.getElementById('subtotal-amount').innerText = `$${parsedBillAmount.toFixed(2)}`;
    document.getElementById('tip-amount').innerText = `$${tipAmount.toFixed(2)}`;
    document.getElementById('total-amount').innerText = `$${total.toFixed(2)}`;

    // Show the numbers
    document.querySelector('.showthenumbers').style.display = 'block';
}