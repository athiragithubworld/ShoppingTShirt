import React from "react";

const CartContext = React.createContext({
  PrdtList: [],
  totalPrice: 0,
  addProduct: (product) => {},
  quantityLarge: 0,
  quantityMedium: 0,
  quantitySmall: 0,
  productList: [],
  addShirtProducts: (productitem) => {},
});

export default CartContext;
