// Declaring the functions
function validateInputs(inputField) {
    let value = inputField.value.trim();
    let errorMsg = "";
    let addErrorClass = true;

    if (value == "")
        errorMsg = "Please fill out this field";

    else if (value.length < inputField.getAttribute("data-minlength"))
        errorMsg = `This field requires at least ${inputField.getAttribute("data-minlength")} characters`;

    else if (inputField.hasAttribute("data-fixed-length") && (value.length !== parseInt(inputField.getAttribute("maxlength"))))
        errorMsg = `This field should have ${inputField.getAttribute("maxlength")} characters`;
  
    else if (inputField.id === "email" && !inputField.value.includes("@"))
        errorMsg = "'@' Should be included in the email address";

    else
        addErrorClass = false;
    
    let errorMsgContainer = inputField.parentNode.querySelector(".error-box");
    errorMsgContainer.innerHTML = `<p>${errorMsg}</p>`;

    addErrorClass ? inputField.classList.add("error") : inputField.classList.remove("error");
}


function showPaymentConfirmBox() {
    let cardHolderName = document.getElementById("cardholder-name").value;
    let confirmName = document.getElementById("name-confirm");
    let confirmTotal = document.getElementById("total-confirm");
    confirmName.innerText = cardHolderName;
    confirmTotal.innerText = total;

    let paymentConfirm = document.querySelector(".payment-confirm-box");
    let overlay = document.getElementById("overlay");

    paymentConfirm.classList.add("active");
    overlay.classList.add("active");
}


function displaypaymentLoadingnSuccessBox() {
    let paymentLoadingBox = document.querySelector(".payment-loading-box");
    let paymentSuccessBox = document.querySelector(".payment-success-box");
    let overlay = document.getElementById("overlay");

    paymentLoadingBox.classList.add("active");
    overlay.classList.add("active");

    setTimeout(function() {
        paymentLoadingBox.classList.remove("active");
        paymentSuccessBox.classList.add("active");
    }, 2500)
}


//Getting name and email form the previous page
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let username = urlParams.get("user-name");
let email = urlParams.get("user-email");
let total = urlParams.get("total-pass");

document.getElementById("contact-name").value = username;
document.getElementById("email").value = email;

if (total !== null)
    document.getElementById("summary-amount").innerText = total;
else
    document.getElementById("summary-amount").innerText = "$0.00";
    
//Disabling entering of any value other than numbers for numbers only input fields
let numericOnlyElements = document.getElementsByClassName("numeric-only");
for (let element of numericOnlyElements) {
    element.addEventListener("input", function() {
        let value = element.value;
        let correctedValue = value.replace(/[^0-9]/g, ""); //If want to include spaces => /[^0-9\s]/g
        if (correctedValue !== value)
            element.value = correctedValue;
    })
}

//Disabling entering of numbers for string only input fields
let StringOnlyElements = document.getElementsByClassName("string-only");
for (let element of StringOnlyElements) {
    element.addEventListener("input", function() {
        let value = element.value;
        let correctedValue = value.replace(/[0-9]/g, "");
        if (correctedValue !== value)
            element.value = correctedValue;
    })
}

//Adding functionality to the "Make Payment" button
let paymentButton = document.querySelector(".submit.btn");
paymentButton.addEventListener("click", function(event) {
    event.preventDefault();
    let inputFields = document.querySelectorAll(".required");
    let hasErrors = false;

    for (let inputField of inputFields) {
        validateInputs(inputField);
        if (inputField.classList.contains("error"))
            hasErrors = true; 
    }
        
    if (!hasErrors) {
        showPaymentConfirmBox();
    }

    else {
        form.scrollIntoView({behavior: "smooth"});
    }

    for (let inputField of inputFields) {
        inputField.addEventListener("input", function(event) {
            let inputField = event.target;
            validateInputs(inputField);
        }
    )}
})

// Adding functionality to the confirm button in payment confirm box
let paymentConfirmButton = document.querySelector(".payment-confirm.btn");
paymentConfirmButton.addEventListener("click", function() {
    let paymentConfirmBox = document.querySelector(".payment-confirm-box");
    let overlay = document.getElementById("overlay");

    paymentConfirmBox.classList.remove("active");
    overlay.classList.remove("active");
    displaypaymentLoadingnSuccessBox();
})

// Closing the payment confirm box
let paymentConfirmCloseButton = document.getElementById("pcbox-close-button");
let overlay = document.getElementById("overlay");
paymentConfirmCloseButton.addEventListener("click", function() {
    let paymentConfirmBox = document.querySelector(".payment-confirm-box");
    paymentConfirmBox.classList.remove("active");
    overlay.classList.remove("active");
})

// Closing the Payment Success dialog box
let paymentSuccessCloseButton = document.getElementById("psbox-close-button");
paymentSuccessCloseButton.addEventListener("click", function() {
    let paymentSuccessBox = document.querySelector(".payment-success-box");
    let overlay = document.getElementById("overlay");
    let form = document.getElementById("form");

    paymentSuccessBox.classList.remove("active");
    overlay.classList.remove("active");
    form.reset();
})