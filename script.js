const food = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        img: 'images/product2.jpg',
        amount: 0,
        baseCalories: 200,
        calories: 0,
        selectedExtras: [],
        extras: {
            doubleMayonnaise: { name: 'Двойной майонез', calories: 100 },
            lettuce: { name: 'Салатный лист', calories: 20 },
            cheese: { name: 'Сыр', calories: 150 }
        },
        get totalPrice() {
            return this.amount * this.price;
        },
        get totalCalories() {
            let total = this.baseCalories;
            for (const extra of this.selectedExtras) {
                total += this.extras[extra].calories;
            }
            return total * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        img: 'images/product1.jpg',
        amount: 0,
        baseCalories: 250,
        calories: 0,
        selectedExtras: [],
        extras: {
            doubleMayonnaise: { name: 'Двойной майонез', calories: 100 },
            lettuce: { name: 'Салатный лист', calories: 20 },
            cheese: { name: 'Сыр', calories: 150 }
        },
        get totalPrice() {
            return this.amount * this.price;
        },
        get totalCalories() {
            let total = this.baseCalories;
            for (const extra of this.selectedExtras) {
                total += this.extras[extra].calories;
            }
            return total * this.amount;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        img: 'images/product3.jpg',
        amount: 0,
        baseCalories: 350,
        calories: 0,
        selectedExtras: [],
        extras: {
            doubleMayonnaise: { name: 'Двойной майонез', calories: 100 },
            lettuce: { name: 'Салатный лист', calories: 20 },
            cheese: { name: 'Сыр', calories: 150 }
        },
        get totalPrice() {
            return this.amount * this.price;
        },
        get totalCalories() {
            let total = this.baseCalories;
            for (const extra of this.selectedExtras) {
                total += this.extras[extra].calories;
            }
            return total * this.amount;
        }
    }
};

function updateDisplay(burgerId) {
    const burgerQuantity = document.querySelector(`#${burgerId} .main__product-num`),
        burgerPrice = document.querySelector(`#${burgerId} .main__product-price`),
        burgerCall = document.querySelector(`#${burgerId} .main__product-call`),
        burger = food[burgerId];

    burgerQuantity.textContent = burger.amount
    burgerPrice.textContent = burger.totalPrice.toLocaleString() + ' сум'
    burgerCall.textContent = burger.totalCalories.toLocaleString() + ' калорий'
}

function selectedExtrasList(burgerId) {
    const burger = food[burgerId];
    const selectedExtrasList = burger.selectedExtras.map(extra => burger.extras[extra].name)
    console.log(selectedExtrasList);

}

function updateCall(burger) {
    burger.calories = burger.baseCalories
    for (const extra of burger.selectedExtras) {
        burger.calories += burger.extras[extra].calories
    }
}

const plusBtn = document.querySelectorAll('.plus')
const minusBtn = document.querySelectorAll('.minus')

function plus(event) {
    const burgerId = event.target.closest('.main__product').id
    const burger = food[burgerId]
    burger.amount++
    updateDisplay(burgerId)
}

function minus(event) {
    const burgerId = event.target.closest('.main__product').id
    const burger = food[burgerId]
    if (burger.amount > 0) {
        burger.amount--
    }
    updateDisplay(burgerId)
}

plusBtn.forEach(button => {
    button.addEventListener('click', plus)
})

minusBtn.forEach(button => {
    button.addEventListener('click', minus)
})


function ExtraCheckboxChange(event) {
    const checkbox = event.target
    const burgerId = checkbox.closest('.main__product').id
    const extraKey = checkbox.getAttribute('data-extra')
    const burger = food[burgerId]

    if (checkbox.checked) {
        burger.selectedExtras = [...burger.selectedExtras, extraKey]
    } else {
        burger.selectedExtras = burger.selectedExtras.filter(extra => extra !== extraKey)
    }
    updateDisplay(burgerId)
    updateCall(burger)
}

const checkboxes = document.querySelectorAll('.main__product-checkbox')
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', ExtraCheckboxChange)
})


const content = document.querySelector('.receipt__window-out');
const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt');
const orderBtn = document.querySelector('.receipt__window-btn')
const totalCartPrice = document.getElementById('totalPrice')
addCart.addEventListener('click', () => {
    receipt.style.display = 'block';
    receipt.style.opacity = 1;
    let totalCartPriceValue  = 0;
    const selectedBurgers = getSelectedBurgers();
    for (const burger of selectedBurgers) {
        content.innerHTML += addToReceipt(burger);
        totalCartPriceValue += burger.totalPrice
    }
    totalCartPrice.textContent = totalCartPriceValue.toLocaleString()
});

orderBtn.addEventListener('click', () => {
    location.reload()
})


function addToReceipt(burger) {
    const { name, price, amount, totalCalories, selectedExtras } = burger;
    const selectedExtrasList = selectedExtras ? selectedExtras.map(extra => burger.extras[extra].name).join(", ") : "";
    return `
        <h3 class="receipt__window-out-name">
            ${name}
        </h3>
        <div class="receipt__window-out-info">
            <p class="receipt__window-out-info-extra">
                <span class="receipt__window-out-info-extra-text">${selectedExtrasList}</span>
            </p>
            <div class="receipt__window-out-info-quantity">
                <p class="receipt__window-out-info-price">
                    ${amount.toLocaleString()} шт
                </p>
                <p class="receipt__window-out-info-price">
                    ${price.toLocaleString()} сум
                </p>
                <p class="receipt__window-out-info-call">
                    ${totalCalories.toLocaleString()} калорий
                </p>
            </div>
        </div>
    `;
}

function getSelectedBurgers() {
    const selectedBurgers = [];
    for (const burgerId in food) {
        const burger = food[burgerId];
        if (burger.amount > 0) {
            selectedBurgers.push(burger);
        }
    }
    return selectedBurgers;
}


