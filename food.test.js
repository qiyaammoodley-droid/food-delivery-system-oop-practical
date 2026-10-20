import test from 'node:test';
import assert from 'node:assert/strict';
import { FoodItem, Pizza, Burger, Drink, Dessert, Order } from './food.js';

test('food item stores its name and price', () => {
  const pizza = new Pizza('Cheese Pizza', 80, 'Large');
  assert.equal(pizza.name, 'Cheese Pizza');
  assert.equal(pizza.getPrice(), 80);
});

test('price cannot be set to an invalid amount', () => {
  const burger = new Burger('Burger', 50);
  assert.throws(() => burger.setPrice(-5), /above zero/);
  assert.throws(() => new FoodItem('Bad food', 0), /above zero/);
});

test('food types have different delivery fees', () => {
  assert.equal(new Pizza('Pizza', 80, 'Large').getDeliveryFee(), 25);
  assert.equal(new Burger('Burger', 50).getDeliveryFee(), 18);
  assert.equal(new Drink('Juice', 20, '500ml').getDeliveryFee(), 10);
});

test('an order calculates food, delivery and final totals', () => {
  const order = new Order();
  order.addItem(new Pizza('Pizza', 80, 'Large'));
  order.addItem(new Drink('Juice', 20, '500ml'));
  assert.equal(order.getFoodTotal(), 100);
  assert.equal(order.getDeliveryTotal(), 35);
  assert.equal(order.getFinalTotal(), 135);
});

test('dessert works with the same order class', () => {
  const order = new Order();
  order.addItem(new Dessert('Brownie', 30, 'Chocolate brownie'));
  assert.equal(order.getFinalTotal(), 42);
  assert.equal(order.items[0].getType(), 'Dessert');
});

test('an item can be removed from an order', () => {
  const order = new Order();
  order.addItem(new Burger('Burger', 50));
  order.removeItem(0);
  assert.equal(order.items.length, 0);
  assert.equal(order.getFinalTotal(), 0);
});

test('only FoodItem objects can be added', () => {
  const order = new Order();
  assert.throws(() => order.addItem({ name: 'Not a class item' }), /Only food items/);
});
