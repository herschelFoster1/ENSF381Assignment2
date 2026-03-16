
const timerElement = document.getElementById("timer");

if (timerElement) {
    let timeLeft = 600; 

    const timer = setInterval(function () {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const formatted = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        timerElement.textContent = formatted;

        if (timeLeft <= 0) {
            clearInterval(timer);
            window.location.href = "order_summary.html";
        }

        timeLeft--;
    }, 1000);
}

const baseOptions = document.querySelectorAll('input[name="type"]');
const toppings = document.querySelectorAll('input[type="checkbox"]');
const totalDisplay = document.getElementById("total_price");
const BASE_PRICE = 6;
const TOPPING_PRICE = 1.5;

function updateTotal() {
    let total = BASE_PRICE;

    toppings.forEach(input => {
        if (input.checked) {
            total += TOPPING_PRICE;
        }
    });

    totalDisplay.textContent = "$" + total.toFixed(2);
}

baseOptions.forEach(input => input.addEventListener("change", updateTotal));
toppings.forEach(input => input.addEventListener("change", updateTotal));

updateTotal();

const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function(event) {
        let baseSelected = false;
        let toppingSelected = false;

        baseOptions.forEach(input => {
            if (input.checked) baseSelected = true;
        });

        toppings.forEach(input => {
            if (input.checked) toppingSelected = true;
        });

        if (!baseSelected) {
            alert("Please select a Type");
            event.preventDefault();
            return;
        }

        if (!toppingSelected) {
            alert("Please select at least one topping.");
            event.preventDefault();
            return;
        }

        updateTotal();
    });
}