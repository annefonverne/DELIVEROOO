import React, { Component } from "react"; // on import React et ces components( cart.js)
//React permet de définir des composants en tant que classes ou fonctions.
import axios from "axios";
import "./App.css";
import Cart from "./components/Cart";

// 1) Définir les states
// 2) Créer mon composant Cart

class App extends Component {
  state = {
    // l'état doit  se definir dans le fichier des parents pour etre accessible par les enfants ...
    restaurant: {}, // on a definit l'état des restaurants dans un objet vide
    menu: {}, // on a definit l'état des menus  //
    cart: [
      // { id: "", quantity: 1, name: "Brunch vegan", price: "24,50 €" },
      // { id: "", quantity: 2, name: "Fromage blanc", price: "3,50 €" }
    ]
  };

  //Chaque composant comporte plusieurs «méthodes de cycle de vie» que vous pouvez remplacer pour exécuter du code à des moments particuliers du processus.

  render() {
    //RENDER() :
    //Lorsqu'il est appelé, il doit examiner this.props et this.state et renvoyer l'un des types suivants:
    // Réagir aux éléments.
    // Généralement créé via JSX.
    // Tableaux et fragments
    // Portails
    // Chaîne et nombres
    // Booléen ou nul

    // le render : seule méthode que l'on doit  définir dans une sous-classe React.Component est appelée render ().
    const entries = Object.entries(this.state.menu); // const entries :Object.entries correspond à un tableau ... on rappel menu dans l'enfant render
    const menuItems = []; // on definit un tableau vide
    for (let i = 0; i < entries.length; i++) {
      //on parcours le tableau entries
      menuItems.push(<h2 key={i}>{entries[i][0]}</h2>);
      // Va ajouter "Brunchs", "Petit déjeuner", etc. dans le tableau vide que l'on a crée plus haut
      for (let j = 0; j < entries[i][1].length; j++) {
        menuItems.push(
          <div
            key={entries[i][1][j].id} // Good practice, utiliser l'id d'une donnée
            onClick={() => {
              // Pour mettre à jour le panier,
              // Nous devons créer une copie de l'ancien panier et modifier cette copie
              // avant de faire un setState

              // Pourquoi ?
              // Si on fait ça :
              // this.setState({
              //   cart: this.state.cart
              // })
              // Pour React, il n'y a pas de modification

              const oldCart = this.state.cart;

              // "Destructuring" c'est une fonctionnalité ES6
              // Fonctionne aussi avec les objets
              const newCart = [...oldCart]; // Créer une copie de oldCart

              // Avant d'ajouter un élément dans le tableau, on vérifie si il est déjà présent
              let productFound = false;
              for (let k = 0; k < newCart.length; k++) {
                console.log(newCart[k].name);
                if (newCart[k].id === entries[i][1][j].id) {
                  console.log(newCart[k].id);

                  productFound = true;
                  newCart[k].quantity++;
                }
              }

              if (productFound === false) {
                newCart.push({
                  id: entries[i][1][j].id,
                  quantity: 1,
                  name: entries[i][1][j].title,
                  price: Number(entries[i][1][j].price)
                });
              }

              this.setState({
                cart: newCart
              });

              // setState déclenche le nouveau render
            }}
          >
            {entries[i][1][j].title}
          </div>
        );
      }
    }
    return (
      <div>
        <Cart
          selectedProducts={this.state.cart}
          onIncrement={id => {
            const newCart = [...this.state.cart];

            for (let i = 0; i < newCart.length; i++) {
              if (newCart[i].id === id) {
                newCart[i].quantity++;
              }
            }

            this.setState({
              cart: newCart
            });
          }}
        />

        <h1>{this.state.restaurant.name}</h1>
        {menuItems}
      </div>
    );
  }

  componentDidMount() {
    axios.get("https://deliveroo-api.now.sh/menu").then(response => {
      this.setState({
        restaurant: response.data.restaurant,
        menu: response.data.menu
      });
    });
  }
}

export default App;
