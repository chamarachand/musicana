// Declaring the functions
function addToCart(event) {
    
    let buttonClicked = event.target;
    let shopItem = buttonClicked.closest(".sales-item");
    let productName = shopItem.querySelector(".product-name").innerText;

    if (!alreadyExistsInCart(productName)) {
        let price = shopItem.querySelector(".item-price").innerText;
        let imgLink = shopItem.querySelector(".sales-item img").src;

        let newCartRow = document.createElement("div");
        newCartRow.classList.add("cart-row");
        let cart = document.querySelector(".cart-content");
        
        let contentToBeAdded = `
            <img class="cart-item-image" src="${imgLink}" alt="">
            <div class="cart-item-details">
                <div class="cart-item-name">${productName}</div>
                <div class="cart-item-price">${price}</div>
                <input class="cart-item-quantity" type="number" value="1" min="1">
            </div>
            <i class="fa-solid fa-trash remove-button"></i>`

        newCartRow.innerHTML = contentToBeAdded;
        cart.append(newCartRow);
        
        updateCartTotal();
        let cartItemRemoveButton = newCartRow.querySelector(".remove-button");
        cartItemRemoveButton.addEventListener("click", removeCartItem);

        let cartItemquantity = newCartRow.querySelector(".cart-item-quantity");
        cartItemquantity.addEventListener("change", updateCartTotal);
        cartItemquantity.addEventListener("change", updateCartItemCount);
    } else
        displayPopUpBox();

    disableButtons();
    updateCartItemCount();
}


function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.closest(".cart-row").remove();
    updateCartTotal();
    disableButtons();
    updateCartItemCount();
}


function updateCartTotal() {
    let cartItems = document.getElementsByClassName("cart-row");
    let total = 0;

    for (let cartItem of cartItems) {
        let priceElement = cartItem.getElementsByClassName("cart-item-price")[0];
        let quantityElement = cartItem.getElementsByClassName("cart-item-quantity")[0];
        let price = parseFloat(priceElement.innerText.slice(1));
        let quantity = quantityElement.value;
        total += price * quantity;
    }

    document.querySelector(".total-price p").innerText = "$" + total.toFixed(2);
}


function alreadyExistsInCart(productName) {
    let exists = false;
    let itemsInCart = document.getElementsByClassName("cart-item-name");
    for (let cartItem of itemsInCart) {
        if (cartItem.innerText == productName)
            exists = true;
    }
    return exists;
}


function clearCart() {
    let allItems = document.getElementsByClassName("cart-row");
    while (allItems.length > 0)
        allItems[0].remove();
    updateCartTotal();
    disableButtons();
    updateCartItemCount();
}


function disableButtons() {
    let cartItems = document.getElementsByClassName("cart-row");
    let cartButtons = document.querySelectorAll(".cart .btn");
    if (cartItems.length === 0) {
        for (button of cartButtons)
            button.disabled = true;
    } else {
        for (button of cartButtons)
            button.disabled = false;
    }
}


function displayPopUpBox() {
    let dialogBox = document.getElementById("already-added-box");
    let overlay = document.getElementById("overlay");

    dialogBox.classList.add("active");
    overlay.classList.add("active");
}


function closePopUpBox() {
    let dialogBox = document.getElementById("already-added-box");
    let overlay = document.getElementById("overlay");

    dialogBox.classList.remove("active");
    overlay.classList.remove("active");
}


function updateCartItemCount() {
    let cartItemCounter = document.getElementById("cart-item-count");
    let total = 0;
    let quantityInputs = document.getElementsByClassName("cart-item-quantity");
    for (quantity of quantityInputs) {
        total += parseInt(quantity.value);
    }
    cartItemCounter.innerText = total;
}


function validateInputs(inputField) {
    let value = inputField.value.trim();
    let errorMsg = "";
    let addErrorClass = true;

    if (value == "")
        errorMsg = "Please fill out this field";
    
    else if (value.length < inputField.getAttribute("data-minlength"))
        errorMsg = `This field requires at least ${inputField.getAttribute("data-minlength")} characters`;

    else if (inputField.id === "user-email" && (!/^\S+@\S+\.\S+$/.test(userEmail.value)))
        errorMsg = "Please enter a valid email address";

    else
        addErrorClass = false;

    let errorMsgContainer = inputField.parentNode.querySelector(".error-box");
    errorMsgContainer.innerHTML = `<p>${errorMsg}</p>`;

    addErrorClass ? inputField.classList.add("error") : inputField.classList.remove("error");
}

function closeDialogBox() {
    document.querySelector("#primary-data-box").classList.remove("active");
    overlay.classList.remove("active");
}


// Initialization
updateCartTotal();
disableButtons();

// Adding functionality to "Add to Cart" buttton
let cart = document.querySelector(".cart");
let addToCartButtons = document.getElementsByClassName("add-to-cart");
for (let button of addToCartButtons) {
    button.addEventListener("click", addToCart);
    button.addEventListener("click", function() {
        cart.classList.add("active");
    })
}

// Closing the pop up box (Item Already added alert)
let popupCloseButton = document.getElementById("popup-close-button");
popupCloseButton.addEventListener("click", closePopUpBox);

// Opening the cart
let cartOpen = document.getElementById("cart-button");  
    cartOpen.addEventListener("click", function() {
    document.querySelector(".cart").classList.add("active");
})

// Closing the cart
let cartCloseButton = document.getElementById("cart-close-button");
cartCloseButton.addEventListener("click", function() {
    document.querySelector(".cart").classList.remove("active");
})

// Removing items from the cart
let cartItemRemoveButtons = document.getElementsByClassName("remove-button");
for (let button of cartItemRemoveButtons) {
    button.addEventListener("click", removeCartItem);
}

// Adding functionality to the "Clear Cart" button
let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearCart);

//Adding functionality to "Buy Now" Button
let buyNowButton = document.getElementById("buy-now-button");
let overlay = document.getElementById("overlay");

buyNowButton.addEventListener("click", function() {
    document.querySelector("#primary-data-box").classList.add("active");
    overlay.classList.add("active");

    let totalPrice = document.querySelector(".total-price p").textContent;
    let totalPass = document.getElementById("total-pass");
    totalPass.value = totalPrice;
})

// Allowing the user to enter letters and single spaces only in the dialog box
let userName = document.getElementById("user-name");
    userName.addEventListener("input", function() {
        let value = userName.value;
        let correctedValue = value.replace(/[^\sa-zA-Z]/g, "").replace("  ", " "); //Removes any character other than letters and single spaces
        if (correctedValue !== value)
            userName.value = correctedValue;
})

// Preventing user from entering spaces in the email address in the dialog box
let userEmail = document.getElementById("user-email");
    userEmail.addEventListener("input", function() {
        let value = userEmail.value;
        let correctedValue = value.replace(" ", "");
        if (correctedValue !== value)
            userEmail.value = correctedValue;
})

// Diasabling the Procced button in the dialog box if agree to terms and conditions unchecked
let agreeToTermsConditons = document.getElementById("terms-conditions-agree");
agreeToTermsConditons.addEventListener("input", function() {
    proccedButton.disabled = false;
    if (!agreeToTermsConditons.checked)
        proccedButton.disabled = true;
})

// Closing the dialog box 
let dialogBoxCloseButton = document.getElementById("dialog-close-button");
dialogBoxCloseButton.addEventListener("click", closeDialogBox);

// Adding functionality to the "Procced" button in the dialog box
let proccedButton = document.getElementById("procced");
let form = document.getElementById("form");

proccedButton.addEventListener("click", function(event) {
    event.preventDefault();

    let userName = document.getElementById("user-name");
    validateInputs(userName);

    let userEmail = document.getElementById("user-email");
    validateInputs(userEmail);

    if (!userName.classList.contains("error") && !userEmail.classList.contains("error")) {
        form.submit();
        closeDialogBox();
        clearCart();
    }
    
    else {
        let inputFields = [userName, userEmail];
        for (let inputField of inputFields) {
            inputField.addEventListener("input", function() {
                validateInputs(inputField);
            })
        }
    }
})

// Automatically closing the cart when scrolled down to the bottom of the page (footer section) and reopening when scrolled up
let bottom = document.querySelector(".columndiv br");
let scrolledToBottom = false;

let observer =  new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio > 0 && cart.classList.contains("active")) {
        cart.classList.remove("active");
        scrolledToBottom = true;
    } else if (scrolledToBottom) {
        cart.classList.add("active");
        scrolledToBottom = false;
    }
})

observer.observe(bottom);