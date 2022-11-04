'use strict';

import { menuArray } from '/js/data.js';

const totalPriceEl = document.querySelector('.total-price-value');
const orderPanel = document.getElementById('order-submit');
const userDetails = document.querySelector('.user-details');
const overlay = document.querySelector('.overlay');
const orderDone = document.querySelector('.order-done');

// Values
let addedItems = [];

document.addEventListener('click', function (e) {
  if (e.target.dataset.add) {
    getAddedItems(e.target.dataset.add);
  } else if (e.target.dataset.decrease) {
    decreaseItem(e.target.dataset.decrease);
  } else if (e.target.dataset.remove) {
    removeItem(e.target.dataset.remove);
  } else if (e.target.id === 'btn-order') {
    completeOrder();
  } else if (e.target.id === 'close-btn') {
    closeOrder();
  }
});

userDetails.addEventListener('submit', pay);

function render() {
  let feedHtml = '';

  menuArray.forEach(item => {
    feedHtml += `
      <div class="item">
        <p class="item-img">${item.emoji}</p>
        <div class="item-details">
          <p class="item-name">${item.name}</p>
          <p class="item-content">${item.ingredients}</p>
          <p class="item-price">$${item.price}</p>
        </div>
        <div class="item-btn-wrapper">
          <button class="item-add-btn" data-add="${item.uuid}"></button>

          <button class="item-decrease-btn" data-decrease="${item.uuid}"></button>
        </div>
      </div>
    `;
  });

  document.querySelector('.items').innerHTML = feedHtml;
}
render();

// addedItems
function getAddedItems(uuid) {
  orderDone.classList.add('hidden');

  menuArray.forEach((item, index) => {
    if (item.uuid === uuid) {
      if (!addedItems.includes(item)) {
        addedItems.push(item);
        addedItems[addedItems.indexOf(item)].number++;
      } else {
        addedItems[addedItems.indexOf(item)].number++;
      }
    }
  });

  renderAddedItems(addedItems);
}

function renderAddedItems(addedItems) {
  let feedHtml = '';
  let totalPrice = 0;

  addedItems.forEach(item => {
    feedHtml += `
      <div class="order-item-wrapper">
        <span class="order-item-count">X${item.number} </span>
        <p class="order-item-name">${item.name}</p>
        <button class="btn-remove" data-remove="${item.uuid}">Remove</button>
        <span class="order-item-price">$${item.price * item.number}</span>
      </div>
    `;

    totalPrice += item.price * item.number;
  });

  totalPriceEl.textContent = `$${totalPrice}`;

  if (totalPriceEl.textContent !== '$0') {
    orderPanel.classList.remove('hidden');
  } else if (totalPriceEl.textContent === '$0') {
    orderPanel.classList.add('hidden');
  }

  document.getElementById('order-items').innerHTML = feedHtml;
}

// Remove item
function removeItem(uuid) {
  addedItems.forEach((item, index) => {
    if (item.uuid === uuid) {
      addedItems[index].number = 0;
      addedItems.splice(index, 1);
    }
  });

  renderAddedItems(addedItems);
}

// Decrease item
function decreaseItem(uuid) {
  addedItems.forEach((item, index) => {
    if (item.uuid === uuid) {
      addedItems[index].number--;
      if (addedItems[index].number === 0) {
        addedItems.splice(index, 1);
      }
    }
  });

  renderAddedItems(addedItems);
}

// Complete order
function completeOrder() {
  console.log('clicked');
  userDetails.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeOrder() {
  userDetails.classList.add('hidden');
  overlay.classList.add('hidden');
}

function pay(e) {
  e.preventDefault();

  const formData = new FormData(userDetails);
  const userName = formData.get('name');

  userDetails.classList.add('hidden');
  overlay.classList.add('hidden');
  orderDone.classList.remove('hidden');

  orderDone.innerHTML = `<p>Thanks, ${userName}! Your order is on its way!</p>`;

  addedItems.forEach(item => {
    item.number = 0;
    addedItems = [];
  });
  renderAddedItems(addedItems);
}

// Elements & Input
// Btn Elements

// Event listeners

// LocalStorage Functions
// Utility Functions
// Functions

/* 
            <div class="order-item-wrapper">
              <span class="order-item-count">5X </span>
              <p class="order-item-name">Pizza</p>
              <button class="btn-remove">Remove</button>
              <span class="order-item-price">$14</span>
            </div>
*/

//           <p class="total-price-wrapper">Total price: <span class="total-price-value">$26</span></p>
