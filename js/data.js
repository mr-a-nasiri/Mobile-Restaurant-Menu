import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const menuArray = [
  {
    name: 'Pizza',
    ingredients: ['pepperoni', 'mushroom', 'mozzarella'],
    price: 14,
    emoji: '🍕',
    uuidv4: uuidv4(),
  },
  {
    name: 'Hamburger',
    ingredients: ['beef', 'cheese', 'lettuce'],
    price: 12,
    emoji: '🍔',
    uuidv4: uuidv4(),
  },
  {
    name: 'Beer',
    ingredients: ['grain, hops, yeast, water'],
    price: 12,
    emoji: '🍺',
    uuidv4: uuidv4(),
  },
];
