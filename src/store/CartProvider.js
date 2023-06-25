import { useState, useEffect } from "react";
import axios from "axios";

import CartContext from "./CartContext";

const CartProvider = (props) => {
  const [cartId, setcartID] = useState("");
  const [large, setLarge] = useState("");
  const [medium, setMedium] = useState("");
  const [small, setSmall] = useState("");

  const [productLists, setProductList] = useState([]);
  const [pdtItems, setPdtItems] = useState([]);

  // ---------------get items from addproductbutton------------------------------//

  let shirtProductObj = {};
  useEffect(() => {
    axios
      .get(
        "https://crudcrud.com/api/cfc53821a61e44f0a6b2f5e8425172b7/addedProducts"
      )
      .then((response) => {
        // console.log("1x1", response.data);

        shirtProductObj = response.data;
        setProductList(shirtProductObj);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  //  add items to addedproducts
  const addShirtProductHandler = (shirtitem) => {
    // save to crudcrud server
    axios
      .post(
        "https://crudcrud.com/api/cfc53821a61e44f0a6b2f5e8425172b7/addedProducts",
        shirtitem
      )
      .then((response) => {
        console.log(response);

        setProductList([...productLists, response.data]);
      })
      .catch((err) => {
        console.log(err);
      });

    // setProductList(medProductObj);
  };

  // get items from carts
  useEffect(() => {
    axios
      .get(
        `https://crudcrud.com/api/cfc53821a61e44f0a6b2f5e8425172b7/cartProducts`
      )
      .then((response) => {
        console.log("get the data", response.data);
        // cartitem = response.data;
        setPdtItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // -------------------- add items to cart --------------

  const addProductToCartHandler = (item) => {
    let cartPdt = [...pdtItems];
    // console.log("pdt123",cartPdt)
    let hasProduct = false;

    cartPdt.forEach((product) => {
      if (product.id === item.id) {
        hasProduct = true;
        product.quantityLarge =
          Number(product.quantityLarge) + Number(item.quantityLarge);
        product.quantityMedium =
          Number(product.quantityMedium) + Number(item.quantityMedium);
        product.quantitySmall =
          Number(product.quantitySmall) + Number(item.quantitySmall);

        setLarge(product.quantityLarge);
        setMedium(product.quantityMedium);
        setSmall(product.quantitySmall);
        setcartID(product._id);
      }
    });

    if (hasProduct) {
      const largevalue = large.toString();
      const mediumvalue = medium.toString();
      const smallvalue = small.toString();
      axios
        .put(
          `https://crudcrud.com/api/cfc53821a61e44f0a6b2f5e8425172b7/cartProducts/${cartId}}`,
          {
            id: item.id,
            billName: item.tshirt,
            billDescription: item.description,
            billPrice: item.price,
            quantityLarge: largevalue,
            quantityMedium: mediumvalue,
            quantitySmall: smallvalue,
          }
        )
        .then((response) => {
          console.log("update data", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      // setPdtItems(cartPdt);
    } else {
      const largevalue = item.quantityLarge.toString();
      const mediumvalue = item.quantityMedium.toString();
      const smallvalue = item.quantitySmall.toString();
      axios
        .post(
          `https://crudcrud.com/api/cfc53821a61e44f0a6b2f5e8425172b7/cartProducts`,
          {
            // medProductid: item._id,
            id: item.id,
            billName: item.tshirt,
            billDescription: item.description,
            billPrice: item.price,
            quantityLarge: largevalue,
            quantityMedium: mediumvalue,
            quantitySmall: smallvalue,
          }
        )
        .then((response) => {
          console.log("get post data", response.data);
          setPdtItems((prevPdt) => {
            return [...prevPdt, response.data];
          });
        })
        .catch((error) => {
          console.log(error);
        });

      //   setPdtItems((prevPdt) => {
      //     const b = [...prevPdt, item];

      //     return [...prevPdt, item];
      //   });
    }
  };

  const CartContexts = {
    PrdtList: pdtItems,
    totalPrice: 0,
    addProduct: addProductToCartHandler,
    quantityLarge: 0,
    quantityMedium: 0,
    quantitySmall: 0,
    productList: productLists,
    addShirtProducts: addShirtProductHandler,
  };
  //   console.log("cartcontext",CartContexts)
  return (
    <CartContext.Provider value={CartContexts}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
