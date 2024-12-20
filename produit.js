// Classe Product pour modéliser un produit
class Product {
    constructor(id, name, description, quantity, price) {
      this.id = Date.now();
      this.name = name;
      this.description = description;
      this.quantity = quantity;
      this.price = price;
    }
  }
 
  module.exports = Product;