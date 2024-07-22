
const welcomeDiv = document.getElementsByClassName("Welcome")

welcomeDiv[0].innerHTML = `Welcome, ${localStorage.getItem("email")}!`;

const cartLength = document.getElementById("cart-count");

let cart = [];

// Check if there's a saved cart in localStorage

if (localStorage.getItem("cart")) {
    // Parse the JSON string and assign the cart array to the variable
    cart = JSON.parse(localStorage.getItem("cart"));
    cartLength.textContent = cart.length;
}

function addtoCart(itemB) {
    const item = itemB.parentElement.parentElement;

    const itemImg = item.querySelector(".item-img").currentSrc;
    const itemName = item.querySelector(".item-name").innerText;
    const itemPrice = item.querySelector(".item-price").innerText;
    const itemP = item.querySelector(".item-p").innerText;

    const itemCard = {
        img: itemImg,
        name: itemName,
        price: itemPrice,
        p: itemP,
        quantity :1
    }

    // Check if the item is already in the cart array, if so, increase the quantity
    let found =false
    // Increase the quantity of the existing item
    cart.forEach(item => {
        if (item.name === itemName) {
            item.quantity++;
            found = true;
        }
    });

    if(!found){
        // Add the new item to the cart array
        cart.push(itemCard);
    }
    // save cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // chenge length of cart 
    cartLength.textContent = cart.length;
}



