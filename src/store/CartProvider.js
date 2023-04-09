import React from "react";

import CartContext from "./CartContext";

const cartProvider = (props) => {
  const CartContext = {
    PrdtList: [],
    totalPrice: 0,
    addProduct: (product) => {},
    quantityLarge: 0,
    quantityMedium: 0,
    quantitySmall: 0,
  };

  return <CartContext.Provider value={CartContext
  }>
    {props.children}
    </CartContext.Provider>;
};

export default cartProvider;
