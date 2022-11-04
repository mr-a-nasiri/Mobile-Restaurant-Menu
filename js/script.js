'use strict';

import { menuArray } from '/js/data.js';

const totalPriceEl = document.querySelector('.total-price-value');

const orderPanel = document.getElementById('order-submit');
// Values
const addedItems = [];

document.addEventListener('click', function (e) {
  if (e.target.dataset.add) {
    getAddedItems(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    removeItem(e.target.dataset.remove);
  } else if (e.target.dataset.decrease) {
    decreaseItem(e.target.dataset.decrease);
  }
});

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
  menuArray.forEach((item, index) => {
    if (item.uuid === uuid) {
      if (!addedItems.includes(item)) {
        addedItems.push(item);
        addedItems[index].number++;
      } else {
        addedItems[index].number++;
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
