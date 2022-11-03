'use strict';

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { menuArray } from '/js/data.js';

// Values
const selectedItems = [];

document.addEventListener('click', function (e) {
  if (e.target.dataset.add) {
    addItem(e.target.dataset.add);
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
        <button class="item-add-btn" data-add="${uuidv4()}"></button>
      </div>
    `;
  });

  document.querySelector('.items').innerHTML = feedHtml;
}
render();

function addItem(uuid) {
  document.getElementById('order-submit').classList.remove('hidden');

  menuArray.forEach(item => {
    if (item.uuid === uuid) selectedItems.push(item);
  });
}
// Elements & Input
// Btn Elements

// Event listeners

// LocalStorage Functions
// Utility Functions
// Functions

/* <div class="item">
  <img src="images/pizza.png" alt="pizza" class="item-img" />
  <div class="item-details">
    <p class="item-name">Pizza</p>
    <p class="item-content">pepperoni,mushroom,mozzarella</p>
    <p class="item-price">$14</p>
  </div>
  <button class="item-add-btn"></button>
</div> */
