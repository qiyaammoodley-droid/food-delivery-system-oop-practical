import { Pizza, Burger, Drink, Dessert, Order } from './food.js';

const order = new Order();
const menu = [
  new Pizza('Margherita Pizza', 89.99, 'Medium'),
  new Burger('Classic Burger', 64.50, true),
  new Drink('Orange Juice', 22, '500ml'),
  new Dessert('Chocolate Brownie', 35, 'Chocolate brownie')
];

const menuElement = document.querySelector('#menu');
const orderElement = document.querySelector('#order-items');
const foodTotalElement = document.querySelector('#food-total');
const deliveryTotalElement = document.querySelector('#delivery-total');
const finalTotalElement = document.querySelector('#final-total');
const messageElement = document.querySelector('#message');

function money(amount) {
  return `R ${amount.toFixed(2)}`;
}

function showMenu() {
  menuElement.innerHTML = '';
  menu.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'menu-item';
    card.innerHTML = `
      <div>
        <span class="tag">${item.getType()}</span>
        <h3>${item.name}</h3>
        <p>${item.getDetails()}</p>
        <strong>${money(item.getPrice())}</strong>
      </div>
      <button data-index="${index}">Add to order</button>
    `;
    menuElement.appendChild(card);
  });
}

function showOrder() {
  orderElement.innerHTML = '';

  if (order.items.length === 0) {
    orderElement.innerHTML = '<p class="empty">Your order is empty. Add something tasty!</p>';
  }

  order.items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'order-row';
    row.innerHTML = `
      <div><strong>${item.name}</strong><small>${item.getType()} · Delivery: ${money(item.getDeliveryFee())}</small></div>
      <div class="row-actions"><span>${money(item.getPrice())}</span><button class="remove" data-index="${index}" aria-label="Remove ${item.name}">×</button></div>
    `;
    orderElement.appendChild(row);
  });

  foodTotalElement.textContent = money(order.getFoodTotal());
  deliveryTotalElement.textContent = money(order.getDeliveryTotal());
  finalTotalElement.textContent = money(order.getFinalTotal());
}

menuElement.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-index]');
  if (!button) return;
  order.addItem(menu[Number(button.dataset.index)]);
  messageElement.textContent = 'Item added to your order.';
  showOrder();
});

orderElement.addEventListener('click', (event) => {
  const button = event.target.closest('button.remove');
  if (!button) return;
  order.removeItem(Number(button.dataset.index));
  messageElement.textContent = 'Item removed from your order.';
  showOrder();
});

document.querySelector('#clear-order').addEventListener('click', () => {
  while (order.items.length > 0) order.removeItem(0);
  messageElement.textContent = 'Your order has been cleared.';
  showOrder();
});

showMenu();
showOrder();
