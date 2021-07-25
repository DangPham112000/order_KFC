const items = [
    { name: 'Pizza 001', price: 6.9, quantity: 1 },
    { name: 'Pizza 002', price: 7.9, quantity: 1 },
    { name: 'Pizza 003', price: 8.9, quantity: 1 },
];


const SHIPPING = 2;

$('#btn-add').addEventListener('click', () => {
    addFood();
});

function addFood() {
    items.push({
        name: `Pizza ${(Math.random()*10).toFixed(2)}`,
        quantity: 1,
        price: Math.random() * 10,
    })

    render();
}

function remove(index) {
    items.splice(index, 1);
    render();
}

function updateQuantity(index, quantity) {
    if (quantity < 1) {
        return;
    }

    items[index].quantity = quantity;
    render();
}

function render() {
    let subtotal = 0;
    items.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    const total = subtotal + SHIPPING;

    const html = items.map(item => `
        <li class="order-item">
            <span class="item-name">${item.name}</span>

            <span class="item-quantity">
                <button class="dec-btn">-</button>
                <input class="quantity" type="number" value="${item.quantity}">
                <button class="inc-btn">+</button>
            </span>

            <span class="item-price">
                <span>$${(item.quantity * item.price).toFixed(2)}</span>
            </span>

            <button class="btn-delete">X</button>
        </li>
    `).join('');

    $('.order-items').innerHTML = html;

    const deleteBtns = [ ...$$('.btn-delete') ];
    const decBtns = [ ...$$('.dec-btn') ];
    const incBtns = [ ...$$('.inc-btn') ];
    for (let i=0; i<deleteBtns.length; i++) {
        decBtns[i].addEventListener('click', () => {
            updateQuantity(i, items[i].quantity - 1);
        });
        incBtns[i].addEventListener('click', () => {
            updateQuantity(i, items[i].quantity + 1);
        });
        deleteBtns[i].addEventListener('click', () => {
            remove(i);
        });
    }

    $('#sub-total').innerText = `$${subtotal.toFixed(2)}`;
    $('#shipping').innerText = `$${SHIPPING}`;
    $('#total').innerText = `$${total.toFixed(2)}`;
}

render();