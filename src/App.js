import React , {useState} from "react";

import TShirtShopping from "./Components/TShirtShopping";
import TshirtCart from "./Components/TshirtCart";

import CartProvider from "./store/CartProvider";

function App() {


const [openCart ,setOpenCart] = useState(false)

const clickOpenCart = () =>{
  setOpenCart(true)
}

const closeCart = () =>{
  setOpenCart(false)
}

  return (
    <div>
      <TShirtShopping onClick={clickOpenCart}></TShirtShopping>
      {openCart && <TshirtCart onClose={closeCart}></TshirtCart>}
    </div>
  );
}

export default App;
