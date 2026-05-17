/* Get percentage formula
amount * (interest_rate * 0.01)) / months
*/

// How is the interest rate calculated? 

// What is the monthly payment? 

// What's the total amount that will be paid? 

// How much interest total? 

// Date of last payment? 


// Make variables of each of our elements
const loanAmount = document.querySelector('#loanAmount');
const loanPercentage = document.querySelector('#loanPercentage');
const monthsToPay = document.querySelector('#monthsToPay');
const submit = document.querySelector('.submit');
const clearBtn = document.querySelector('.clearBtn');

// Results
const results = document.querySelector('.results');

// Event listener
// let total; 

submit.addEventListener('click', function(e) {
    e.preventDefault()
    if (loanAmount.value == '' && loanPercentage.value == '' && monthsToPay.value == '') { 
        // make all inputs empty variable
        let allInputsEmpty = document.createElement('h2');
        allInputsEmpty.classList.add('allInputsEmpty', 'errorMessage');
        let allInputsEmptyText = document.createTextNode('You\'ve not entered anything!');
        allInputsEmpty.appendChild(allInputsEmptyText);
        results.appendChild(allInputsEmpty);
    } 
    else if (loanAmount.value == '') {
        let loanAmountEmpty = document.createElement('h2');
        loanAmountEmpty.classList.add('loanAmountEmpty', 'errorMessage');
        let loanAmountEmptyText = document.createTextNode('You must enter a valid loan amount!');
        loanAmountEmpty.appendChild(loanAmountEmptyText);
        results.appendChild(loanAmountEmpty);
    }
     else if (loanPercentage.value == '') {
        let loanPercentageEmpty = document.createElement('h2');
        loanPercentageEmpty.classList.add('loanPercentageEmpty', 'errorMessage');
        let loanPercentageEmptyText = document.createTextNode('You must enter a interest rate!');
        loanPercentageEmpty.appendChild(loanPercentageEmptyText);
        results.appendChild(loanPercentageEmpty);

    } else if (monthsToPay.value == '') {
        let monthsToPayEmpty = document.createElement('h2');
        monthsToPayEmpty.classList.add('monthsToPayEmpty', 'errorMessage');
        let monthsToPayEmptyText = document.createTextNode('You must enter a valid length of the loan');
        monthsToPayEmpty.appendChild(monthsToPayEmptyText);
        results.appendChild(monthsToPayEmpty);
    } else {
        let interestRate = loanAmount.value * (loanPercentage.value * 0.01);
        let total = parseInt(loanAmount.value) + parseInt(interestRate);
            // monthly payment
        monthlyTotal = parseInt(total) / parseInt(monthsToPay.value); 
         //  if class exists remove it, otherwise, change UI. 
        changeUI();

        // Disable Submit button
        submit.disabled = true;
        loanAmount.value = '';
        loanPercentage.value = '';
        monthsToPay.value = '';
    }
});



/* There is two approaches to the change UI function.
- We can create multiple headline (h1 or h2) classes, leave them hidden and empty on default, and fill them in with our calculations when the event (click) is started 
- We can dynamically create it all, when the change UI function is called, we will create however many headline element that we need, and fill them in dynamically.

- The big question is how do we create multiple elements of the same type? IE: multiple h1 elements? And do we need to have a different variable name for each ?

*/
const changeUI = function () {
    let h2LoanAmount = document.createElement('h2');
    h2LoanAmount.className = 'h2LoanAmount';
    let h2LoanAmountText = document.createTextNode('Loan amount: $' + loanAmount.value);
    h2LoanAmount.appendChild(h2LoanAmountText);
    results.appendChild(h2LoanAmount);
    // console.log(h2LoanAmount)

    // Do the same but for Loan %, Length of loan, Monthly Payment, Grand Total

        // Loan Percentage 
        let h2LoanPercentage = document.createElement('h2');
        h2LoanPercentage.className = 'h2LoanPercentage';
        let h2LoanPercentageText = document.createTextNode('Interest Rate: ' + loanPercentage.value + '%');
        h2LoanPercentage.appendChild(h2LoanPercentageText);
        results.appendChild(h2LoanPercentage); 

        // Loan Length
        let h2LoanLength = document.createElement('h2');
        h2LoanLength.className = 'h2LoanLength';
        let h2LoanLengthText = document.createTextNode('Length of loan: ' + monthsToPay.value + ' months');
        h2LoanLength.appendChild(h2LoanLengthText);
        results.appendChild(h2LoanLength);


        // Monthly Payment
        let h2MonthlyPayment = document.createElement('h2');
        h2MonthlyPayment.className = 'h2MonthlyPayment';
        let h2MonthlyPaymentText = document.createTextNode('Monthly Total: $' + monthlyTotal.toFixed(2));
        h2MonthlyPayment.appendChild(h2MonthlyPaymentText);
        results.appendChild(h2MonthlyPayment)

        // Grand Total 
        let h2GrandTotal = document.createElement('h2');
        h2GrandTotal.className = 'h2GrandTotal';
        let h2GrandTotalText = document.createTextNode('Grand Total: $' + monthlyTotal * monthsToPay.value);
        h2GrandTotal.appendChild(h2GrandTotalText);
        results.appendChild(h2GrandTotal);
    }


clearBtn.addEventListener('click', function(e) {
    e.preventDefault()
    submit.disabled = false;
    clear();
});


   
const clear = function() {
    while (results.firstChild) {
        results.removeChild(results.lastChild);
    }
}