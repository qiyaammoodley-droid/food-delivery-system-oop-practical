# BiteBox Food Delivery System

A small JavaScript project for the JavaScript Essentials 2 OOP practical. It lets a user add food to an order, remove items, and see food prices, delivery fees and the final total.

## Food types

- Pizza: delivery fee R25
- Burger: delivery fee R18
- Drink: delivery fee R10
- Dessert: delivery fee R12

These delivery fees are example amounts for this practical.

## How to run it

1. Download or clone the repository.
2. Open `index.html` in a browser. If your browser blocks local JavaScript modules, run a local server from this folder, for example `npx serve .`, then open the address it gives you.
3. To run the tests, install Node.js and run:

```bash
npm test
```

## Where the OOP principles are used

- **Encapsulation:** `FoodItem` stores the price in the private `#price` property. The price is read with `getPrice()` and changed with `setPrice()`.
- **Inheritance:** `Pizza`, `Burger`, `Drink` and `Dessert` extend `FoodItem`, so they share the common name and price behaviour.
- **Abstraction:** The `Order` class gives simple methods such as `addItem()`, `getFoodTotal()` and `getFinalTotal()` so the page does not need to do the calculations itself.
- **Polymorphism:** Each food class has its own `getDeliveryFee()` and `getType()` methods. The order can call the same methods on different item types and get different results.

## Project files

- `index.html`: page layout
- `style.css`: page styling
- `food.js`: classes and calculations
- `app.js`: page interaction
- `food.test.js`: automated tests

## Notes

This is a learning project, not a real ordering or payment service. Prices and delivery fees are examples.
