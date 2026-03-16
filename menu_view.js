const cart = {};
const addButtons = document.querySelectorAll(".add_btn");
const removeButtons = document.querySelectorAll(".remove_btn");
const cartContainer = document.getElementById("cart_container");

addButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
        const tile = btn.closest(".ice_cream_tile");
        const name = tile.querySelector("h3").textContent;
        const priceText = tile.querySelector("p").textContent;
        const price =
            parseFloat(
                priceText.replace(/[^0-9.]/g, "")
            );
        if (!cart[name]) {

            cart[name] = {
                price: price,
                qty: 0
            };
        }
        cart[name].qty++;
        updateCart();
    });
});

removeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
        const tile = btn.closest(".ice_cream_tile");
        const name = tile.querySelector("h3").textContent;
        if (cart[name]) {
            cart[name].qty--;
            if (cart[name].qty <= 0) {
                delete cart[name];
            }
            updateCart();
        }
    });
});


function updateCart() {
    cartContainer.innerHTML = "";
    const keys = Object.keys(cart);
    if (keys.length === 0) {
        cartContainer.innerHTML = '<p id="empty_cart">No items in cart.</p>';
        return;
    }
    keys.forEach((name) => {
        const item = cart[name];
        const total = (item.qty * item.price).toFixed(2);
        const div = document.createElement("div");

        div.className = "cart_item";
        div.innerHTML =
            "<span>" +
            name +
            " (" +
            item.qty +
            ")" +
            "</span>" +
            "<span>$" +
            total +
            "</span>";

        cartContainer.appendChild(div);
    });
}
