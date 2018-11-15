import React from "react";

class Cart extends React.Component {
  render() {
    const products = [];

    for (let i = 0; i < this.props.selectedProducts.length; i++) {
      products.push(
        <li key={this.props.selectedProducts[i].id}>
          <button>-</button>
          <span>{this.props.selectedProducts[i].quantity}</span>
          <button
            // Quand un évènement click doit transmettre une variable, vous devez encapsuler l'appel à la fonction dans une nouvelle fonction
            onClick={() => {
              this.props.onIncrement(this.props.selectedProducts[i].id);
            }}
          >
            +
          </button>

          <span>{this.props.selectedProducts[i].name}</span>
          <span>
            {this.props.selectedProducts[i].price *
              this.props.selectedProducts[i].quantity}
          </span>
        </li>
      );
    }

    return (
      <div>
        <button>Valider mon panier</button>
        <ul>{products}</ul>
      </div>
    );
  }
}

export default Cart;
