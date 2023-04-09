import React from "react";
import classes from './TshirtCart.module.css';

const TshirtCart = (props) =>{


    return(
        <form onClick={props.onClose} className={classes.CartForm}>
            <div className={classes.button}>
            <button>Product Order</button>
            <button>Close</button>
            </div>

        </form>
    )
}

export default TshirtCart;