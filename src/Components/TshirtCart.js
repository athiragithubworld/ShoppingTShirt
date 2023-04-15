import React, { useContext } from "react";
import classes from "./TshirtCart.module.css";

import CartContext from "../store/CartContext";

const TshirtCart = (props) => {
  const cartcntx = useContext(CartContext);
  // console.log("pdtlist", cartcntx);
  let totalAmount = 0;
  // let totalAmount = cartcntx.PrdtList.reduce(
  //     (a, v) => (a = Number(a) + Number(v.price)),
  //     0
  //   );

  return (
    <form onClick={props.onClose} className={classes.CartForm}>
      {/* <div className={classes["cart-items"]}> */}
        <ul className={classes["cart-items"]}>
          {cartcntx.PrdtList.map((item) => {
            let totalprice = (item.price)*(item.quantityLarge+item.quantityMedium+item.quantitySmall)

            return (
              <li key={item.id}>
                {/* const price = item.price.reduce((a,v) => a = Number(a)+ ) */}
                Shirt: {item.tshirt} - Desc: {item.description} - Price:{" "}
                {item.price} - L {Number(item.quantityLarge)}- M{" "}
                {item.quantityMedium} - S {item.quantitySmall} -
                <span> Total Price : {totalprice}</span>    
                
               {/* <span>Total Price : {cartcntx.PrdtList.reduce((a,v) => (a=(Number(v.price)*Number(v.quantityLarge+v.quantityMedium+v.quantitySmall))),0)}</span> */}
              </li>
            );
          })}
        </ul>
      {/* </div> */}
      
      <div className={classes.total}>
        <span>Total Amount : </span>
        <span>$ {cartcntx.PrdtList.reduce((a,v) => (a=Number(a)+(Number(v.price)*Number(v.quantityLarge+v.quantityMedium+v.quantitySmall))),0)} </span>
      </div>
      <div className={classes.button}>
        <button>Product Order</button>
        <button>Close</button>
      </div>
    </form>
  );
};

export default TshirtCart;
