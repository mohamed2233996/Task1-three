
// cart data
function getCartFromLoca() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart;
}
const cartLength = document.getElementById("cart-count");


const cart = getCartFromLoca();
const cartPage = document.getElementById("cart-page");

//remove item
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
}


if (cart.length > 0) {
    document.getElementById("empty-cart").style.display = "none";
    cartLength.textContent = cart.length;
    const cartList = document.getElementById("cart-list");
    cart.forEach((item, index) => {

        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src="${item.img}" alt="" class="h-full w-full object-cover object-center rounded-lg">
            </div>
            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div class="mt-5 sm:mt-0">
                    <h2 class="text-lg font-bold text-gray-900">${item.name}</h2>
                    <p class="mt-1 text-xs text-gray-700">${item.p}</p>
                </div>
                <div class="mt-4 flex justify-between flex-col items-center sm:flex-row sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div class="flex items-center sm:justify-end border-gray-100">
                        <span onclick="decrement(${index})" class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-white">
                            -
                        </span>
                        <input class="quantity-value h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="${item.quantity}" min="1">
                        <span onclick="increment(${index})" class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-white">
                            +
                        </span>
                    </div>
                    <div class="flex items-center space-x-4 sm:mt-0 mt-4">
                        <p class="text-sm font-bold">${item.price} for one</p>
                        <button class="bg-red-600 text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-red-700" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                </div>
            </div>
        </div>`;
        cartList.appendChild(cartItem);
    });
} else {
    cartPage.style.display = "none";
    document.getElementById("empty-cart").style.display = "block";
}

// increment and decrement
const quantityValue = document.getElementsByClassName("quantity-value");

function increment(index) {
    const quantityValue = document.getElementsByClassName("quantity-value")[index];
    const currentQuantity = parseInt(quantityValue.value);
    quantityValue.value = currentQuantity + 1;

    // Update the cart data in local storage
        cart[index].quantity = parseInt(quantityValue.value);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.reload();

}

function decrement(index) {
    const quantityValue = document.getElementsByClassName("quantity-value")[index];
    const currentQuantity = parseInt(quantityValue.value);
    if (currentQuantity > 1) {
        quantityValue.value = currentQuantity - 1;

        // Update the cart data in local storage
        cart[index].quantity = parseInt(quantityValue.value);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.reload();
    }


}

// total price

const subTotal = document.getElementsByClassName("subTotal");
const shipping = document.getElementsByClassName("shipping");
const totalPrice = document.getElementsByClassName("total");

function getTotalPrice() {
    let total = 0;
    cart.forEach(item => {
        const priceN = parseFloat(item.price);
        total += parseFloat(priceN * item.quantity);
    });
    return total;
}

subTotal[0].innerText = `$${getTotalPrice().toFixed(2)}`;
totalPrice[0].innerText = `$${(getTotalPrice() + parseFloat(shipping[0].innerText.replace("$", ""))).toFixed(2)}`;