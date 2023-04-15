import  { useState } from "react";

import CartContext from "./CartContext";

const CartProvider = (props) => {

    const [pdtItems ,setPdtItems] = useState([])

    const addProductToCartHandler = (item) =>{
        let cartPdt =[...pdtItems];
        // console.log("pdt123",cartPdt)
        let hasProduct = false;

        cartPdt.forEach((product) =>{
            
            if(product.id === item.id) {
                hasProduct=true;
                product.quantityLarge = Number(product.quantityLarge)+ Number(item.quantityLarge)
                product.quantityMedium = Number(product.quantityMedium)+ Number(item.quantityMedium)
                product.quantitySmall = Number(product.quantitySmall)+ Number(item.quantitySmall)
            }
        })

        if(hasProduct){
            
            setPdtItems(cartPdt)
        }
        else{
            setPdtItems((prevPdt) =>{
                const b =[...prevPdt,item]
                // console.log("bbb",b)
                return[...prevPdt,item]
            })
        }


    }

  const CartContexts = {
    PrdtList:pdtItems ,
    totalPrice: 0,
    addProduct: addProductToCartHandler,
    quantityLarge: 0,
    quantityMedium: 0,
    quantitySmall: 0,
  };
//   console.log("cartcontext",CartContexts)
  return <CartContext.Provider value={CartContexts}>
    {props.children}
    </CartContext.Provider>;
};

export default CartProvider;
