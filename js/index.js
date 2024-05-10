const products = [
    { id: 1, name: 'T-shirt with tape details', price: 26.99 },
    { id: 2, name: 'Long navy blue jeans', price: 32.99 },
    { id: 3, name: 'Blue Checkerd shirt', price: 37.99 },
    { id: 4, name: 'New rules t-shirt', price: 28.99 },
    { id: 5, name: 'Green lined shirt', price: 30.99 },
    { id: 6, name: 'Short blue jeans', price: 17.99 },
    { id: 7, name: 'Long black jeans', price: 35.99 },
    { id: 8, name: 'Long grey jeans', price: 34.99 },
    { id: 9, name: 'Courage t-shirt', price: 29.99 },
    { id: 10, name: 'Grey checkered shirt', price: 35.99 },
    { id: 11, name: 'Product K', price: 5.99 },
    { id: 12, name: 'Product L', price: 5.99 },
];

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function renderCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cart = getCart();

    cartItemsElement.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} - £${(item.price * item.quantity).toFixed(2)}</span>
            <div>
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
        cartItemsElement.appendChild(li);
    });

    const cartTotalValue = document.getElementById('cart-total-value');
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotalValue.textContent = total.toFixed(2);
}

function addItem(productId) {
    const product = products.find(p => p.id === productId);
    const cart = getCart();

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    renderCart();
}

function removeItem(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
}

function increaseQuantity(productId) {
    const cart = getCart();
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
        saveCart(cart);
        renderCart();

    }
}

function decreaseQuantity(productId) {
    const cart = getCart();
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        saveCart(cart);
        renderCart();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', () => {
    const cart = getCart();
    if (cart.length > 0) {
        alert('Thank you for your purchase!');
        localStorage.removeItem('cart');
        renderCart();
    } else {
        alert('Your cart is empty. Please add items before checking out.');
    }
});
