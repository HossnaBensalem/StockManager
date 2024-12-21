const fs = require('fs');
const Product = require('./produit');
const prompt = require('prompt-sync')();
filePath = "inventory.json";
class Inventory {
    products = [];
    constructor() {
        this.products = this.loadProducts();  
    }

    // Charger les produits depuis un fichier JSON ou renvoyer un tableau vide si le fichier n'existe pas
    loadProducts() {
        try {
            if (fs.existsSync(filePath)) {
                return JSON.parse(fs.readFileSync(filePath, 'utf8'));
            } else {
                return [];
            }
        } catch (error) {
            console.error("Erreur lors du chargement des produits : ", error.message);
            return [];
        }
    }

    // Sauvegarder les produits dans le fichier JSON
    saveProducts() {
        try {
            fs.writeFileSync(filePath, JSON.stringify(this.products, null, 4));  
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des produits : ", error.message);
        }
    }

    // Ajouter un produit
    addProduct() {
        try {
            const name = prompt("Nom du produit : ");
            const description = prompt("Description : ");
            const quantity = parseInt(prompt("Quantité : "), 10);
            const price = parseFloat(prompt("Prix : "));

            // Créer un produit et l'ajouter à la liste
            const newProduct = new Product(name, description, quantity, price);
            this.products.push(newProduct);
            this.saveProducts();
            console.log("Produit ajouté avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit : ", error.message);
        }
    }

    // Afficher tous les produits
    listProducts() {
        try {
            if (this.products.length === 0) {
                console.log("Aucun produit en stock.");
            } else {
                this.products.forEach((product, index) => {
                    console.log(`${index + 1}. ${product.name} - ${product.description} - ${product.quantity} en stock - Prix : ${product.price}`);
                });
            }
        } catch (error) {
            console.error("Erreur lors de l'affichage des produits : ", error.message);
        }
    }

    // Mettre à jour un produit
updateProduct() {
    try {
        // Demander l'index du produit à modifier
        const index = parseInt(prompt("Entrez l'index du produit à modifier (commence à 1) : "), 10) - 1; // soustraire 1 pour s'adapter à l'indexation de tableau (0 basé)
        
        // Vérifier si l'index est valide
        if (index >= 0 && index < this.products.length) {
            // Demander les nouvelles valeurs pour la quantité et le prix
            const newName = prompt("Nouvelle nom du produit");
            const newDescription = prompt("Nouvelle description : ");
            const newQuantity = parseInt(prompt("Nouvelle quantité : "), 10);
            const newPrice = parseFloat(prompt("Nouveau prix : "));

            // Valider les entrées pour s'assurer qu'elles sont des nombres valides
            if (isNaN(newQuantity) || isNaN(newPrice) || newQuantity < 0 || newPrice < 0) {
                console.log("Erreur : La quantité et le prix doivent être des nombres valides et positifs.");
                return;
            }

            // Mettre à jour les propriétés du produit
            this.products[index].name = newName;
            this.products[index].description = newDescription; 
            this.products[index].quantity = newQuantity;
            this.products[index].price = newPrice;

            // Sauvegarder les produits après modification
            this.saveProducts();
            console.log("Produit mis à jour avec succès !");
        } else {
            console.log("Produit non trouvé avec cet index !");
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour du produit : ", error.message);
    }
}


    // Supprimer un produit
    deleteProduct() {
        try {
            this.listProducts();
            const index = parseInt(prompt("Entrez nombre du produit à supprimer : "), 10);

            if (index !== -1) {
                this.products.splice(index-1, 1);  
                this.saveProducts();
                console.log("Produit supprimé avec succès !");
            } else {
                console.log("Produit non trouvé !");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du produit : ", error.message);
        }
    }
}

module.exports = Inventory;

