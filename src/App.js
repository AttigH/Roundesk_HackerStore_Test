import React, { Component } from "react";
import "./App.css";
import "h8k-components";
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
  constructor() {
    super();
    const products = [...PRODUCTS].map((product, index) => {
      product.id = index + 1;
      product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
      product.cartQuantity = 0;
      return product;
    });
    this.state = {
      cart: {
        items: [],
      },
      products,
    };
  }

  togglerAddRemove = (product, action) => {
    if (action === "add") {
      const items = [...this.state.cart.items];
      const ExistedItem =
        items.filter((val) => val.id === product.id).length > 0;
      if (ExistedItem) {
        const newItems = items.map((val) => {
          if (val.id === product.id) {
            val.cartQuantity = val.cartQuantity + 1;
          }
          return val;
        });
        this.setState({
          cart: {
            items: newItems,
          },
        });
      } else {
        product.cartQuantity += 1;
        this.state.cart.items.push(product);
        this.setState({
          cart: { items: this.state.cart.items },
        });
      }
    } else if (action === "remove") {
      const items = [...this.state.cart.items];
      const newItems = items
        .map((val) => {
          if (val.id === product.id) {
            val.cartQuantity = val.cartQuantity - 1;
          }
          return val;
        })
        .filter((val) => val.cartQuantity > 0);
      this.setState({
        cart: {
          items: newItems,
        },
      });
    }
  };

  render() {
    return (
      <div>
        <h8k-navbar header={title}></h8k-navbar>
        <div className="layout-row shop-component">
          <ProductList
            togglerAddRemove={this.togglerAddRemove}
            products={this.state.products}
          />
          <Cart cart={this.state.cart} />
        </div>
      </div>
    );
  }
}

export const PRODUCTS = [
  {
    name: "Cap",
    price: 5,
  },
  {
    name: "HandBag",
    price: 30,
  },
  {
    name: "Shirt",
    price: 35,
  },
  {
    name: "Shoe",
    price: 50,
  },
  {
    name: "Pant",
    price: 35,
  },
  {
    name: "Slipper",
    price: 25,
  },
];
export default App;
