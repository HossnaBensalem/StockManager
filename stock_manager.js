const fs = require('fs');
const Inventory = require('./inventory');
const prompt = require('prompt-sync')();

const inventory = new Inventory();

function displayMenu() {
    console.log("\n1. Ajouter un produit");
    console.log("2. Afficher tous les produits");
    console.log("3. Mettre à jour un produit");
    console.log("4. Supprimer un produit");
    console.log("5. Quitter");
}

function stockManager() {
    let choice;
    do {
        try {
            displayMenu();
            choice = prompt("Choisissez une option: ");
            switch (choice) {
                case '1':
                    inventory.addProduct();
                    break;

                case '2':
                    inventory.listProducts();
                    break;

                case '3':
                    inventory.updateProduct();
                    break;

                case '4':
                    inventory.deleteProduct();
                    break;

                case '5':
                    console.log("Au revoir !");
                    break;

                default:
                    console.log("Option invalide. Essayez encore.");
            }
        } catch (error) {
            console.error("Une erreur est survenue dans le programme principal : ", error.message);
        }
    } while (choice !== '5');
}

stockManager();
