// General class for the food items
export class FoodItem {
  #price;

  constructor(name, price) {
    if (!name || typeof name !== 'string') {
      throw new Error('Please enter a food name.');
    }
    if (typeof price !== 'number' || price <= 0 || !Number.isFinite(price)) {
      throw new Error('Price must be a number above zero.');
    }

    this.name = name;
    this.#price = price;
  }

  getPrice() {
    return this.#price;
  }

  setPrice(newPrice) {
    if (typeof newPrice !== 'number' || newPrice <= 0 || !Number.isFinite(newPrice)) {
      throw new Error('Price must be a number above zero.');
    }
    this.#price = newPrice;
  }

  getType() {
    return 'Food';
  }

  getDeliveryFee() {
    throw new Error('Each food type must have its own delivery fee.');
  }

  getDetails() {
    return this.name;
  }
}

export class Pizza extends FoodItem {
  constructor(name, price, size) {
    super(name, price);
    this.size = size;
  }

  getType() {
    return 'Pizza';
  }

  getDeliveryFee() {
    return 25;
  }

  getDetails() {
    return `${this.size} pizza`;
  }
}

export class Burger extends FoodItem {
  constructor(name, price, isCheese = false) {
    super(name, price);
    this.isCheese = isCheese;
  }

  getType() {
    return 'Burger';
  }

  getDeliveryFee() {
    return 18;
  }

  getDetails() {
    return this.isCheese ? 'Cheese burger' : 'Regular burger';
  }
}

export class Drink extends FoodItem {
  constructor(name, price, volume) {
    super(name, price);
    this.volume = volume;
  }

  getType() {
    return 'Drink';
  }

  getDeliveryFee() {
    return 10;
  }

  getDetails() {
    return `${this.volume} drink`;
  }
}

// Extra food type for the practical
export class Dessert extends FoodItem {
  constructor(name, price, dessertType) {
    super(name, price);
    this.dessertType = dessertType;
  }

  getType() {
    return 'Dessert';
  }

  getDeliveryFee() {
    return 12;
  }

  getDetails() {
    return this.dessertType;
  }
}

export class Order {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    if (!(item instanceof FoodItem)) {
      throw new Error('Only food items can be added to an order.');
    }
    this.items.push(item);
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }

  getFoodTotal() {
    return this.items.reduce((total, item) => total + item.getPrice(), 0);
  }

  getDeliveryTotal() {
    return this.items.reduce((total, item) => total + item.getDeliveryFee(), 0);
  }

  getFinalTotal() {
    return this.getFoodTotal() + this.getDeliveryTotal();
  }
}
