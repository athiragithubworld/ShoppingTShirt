import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import CartContext from "../store/CartContext";

const TShirtShopping = (props) => {
  const cartcntx = useContext(CartContext);

  const [tshirt, setTshirt] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [qLarge, setQLarge] = useState("");
  const [qMedium, setQMedium] = useState("");
  const [qSmall, setQSmall] = useState("");
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setProductList(cartcntx.productList);
  }, [cartcntx.productList]);

  // console.log("Productlist",productList)
  const TshirtHandler = (event) => {
    setTshirt(event.target.value);
  };

  const DescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const PriceHandler = (event) => {
    setPrice(event.target.value);
  };

  const QLargeHandler = (event) => {
    setQLarge(event.target.value);
  };

  const QMediumHandler = (event) => {
    setQMedium(event.target.value);
  };

  const QSmallHandler = (event) => {
    setQSmall(event.target.value);
  };

  const AddProductHandler = (event) => {
    event.preventDefault();

    // setProductList ((prevList) =>{
    const ProductItems = {
      id: Math.random().toString(),
      tshirt: tshirt,
      description: description,
      price: price,
      qLarge: qLarge,
      qMedium: qMedium,
      qSmall: qSmall,
    };

    // return ProductItems;

    // })

    if (
      tshirt === "" ||
      description === "" ||
      price === "" ||
      qLarge === "" ||
      qMedium === "" ||
      qSmall === ""
    ) {
      alert("Please enter valid data");
      return;
    } else {
      cartcntx.addShirtProducts(ProductItems);
    }

    setTshirt("");
    setDescription("");
    setPrice("");
    setQLarge("");
    setQMedium("");
    setQSmall("");
  };

  const QuantityHandler = (item, qname) => {
    // console.log("item",item)

    // let qLarge = Number(item.qLarge) - 1;
    let squantity = 0;
    if (qname === "large") {
      squantity = Number(item.qLarge) - 1;
    } else if (qname === "medium") {
      squantity = Number(item.qMedium) - 1;
    } else if (qname === "small") {
      squantity = Number(item.qSmall) - 1;
    }
    let quantity = {};
    productList.map((product) => {
      // console.log("product",product)
      if (product.id === item.id) {
        if (qname === "large") {
          quantity = { ...product, qLarge: squantity };

          if (squantity >= 0) {
            const updateList = productList.filter((pdt) => pdt.id !== item.id);
            // setProductList([large,...updateList])
            setProductList([...updateList, quantity]);
            cartcntx.addProduct({
              ...item,
              quantityLarge: 1,
              quantityMedium: 0,
              quantitySmall: 0,
            });
          }
        } else if (qname === "medium") {
          quantity = { ...product, qMedium: squantity };

          if (squantity >= 0) {
            const updateList = productList.filter((pdt) => pdt.id !== item.id);
            // setProductList([large,...updateList])
            setProductList([...updateList, quantity]);
            cartcntx.addProduct({
              ...item,
              quantityLarge: 0,
              quantityMedium: 1,
              quantitySmall: 0,
            });
          }
        } else if (qname === "small") {
          quantity = { ...product, qSmall: squantity };

          if (squantity >= 0) {
            const updateList = productList.filter((pdt) => pdt.id !== item.id);
            // setProductList([large,...updateList])
            setProductList([...updateList, quantity]);
            cartcntx.addProduct({
              ...item,
              quantityLarge: 0,
              quantityMedium: 0,
              quantitySmall: 1,
            });
          }
        }
      }
    });

    if (quantity) {
      console.log("???qqq", quantity);
      const { _id, ...rest } = quantity;
      axios
        .put(
          `https://crudcrud.com/api/cfc53821a61e44f0a6b2f5e8425172b7/addedProducts/${item._id}`,
          rest
        )
        .then((response) => {
          // console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //   const MQuantityHandler = (item) => {
  //     // cartcntx.addProduct({...item,quantityLarge:0,quantityMedium:1,quantitySmall:0})
  //     let qMedium = Number(item.qMedium) - 1;

  //     productList.map((product) => {
  //       // console.log("product",product)
  //       if (product.id === item.id) {
  //         // console.log("Large",{...product,qLarge:qLarge})
  //         const Medium = { ...product, qMedium: qMedium };
  //         if (qMedium >= 0) {
  //           const updateList = productList.filter((pdt) => pdt.id !== item.id);
  //           setProductList([...updateList, Medium]);
  //           cartcntx.addProduct({
  //             ...item,
  //             quantityLarge: 0,
  //             quantityMedium: 1,
  //             quantitySmall: 0,
  //           });
  //         }
  //       }
  //     });
  //   };

  //   const SQuantityHandler = (item) => {
  //     // cartcntx.addProduct({...item,quantityLarge:0,quantityMedium:0,quantitySmall:1})

  //     let qSmall = Number(item.qSmall) - 1;

  //     productList.map((product) => {
  //       // console.log("product",product)
  //       if (product.id === item.id) {
  //         // console.log("Large",{...product,qLarge:qLarge})
  //         const Small = { ...product, qSmall: qSmall };
  //         if (qSmall >= 0) {
  //           const updateList = productList.filter((pdt) => pdt.id !== item.id);
  //           setProductList([...updateList, Small]);
  //           cartcntx.addProduct({
  //             ...item,
  //             quantityLarge: 0,
  //             quantityMedium: 0,
  //             quantitySmall: 1,
  //           });
  //         }
  //       }
  //     });
  //   };

  return (
    <div>
      <form>
        <label>T-Shirt </label>
        <input type="text" value={tshirt} onChange={TshirtHandler}></input>

        <label>Description </label>
        <input
          type="text"
          value={description}
          onChange={DescriptionHandler}
        ></input>

        <label>Price </label>
        <input type="number" value={price} onChange={PriceHandler}></input>

        <div>
          <label>Quantity Available</label>
          <label> L </label>
          <input type="number" value={qLarge} onChange={QLargeHandler}></input>

          <label> M </label>
          <input
            type="number"
            value={qMedium}
            onChange={QMediumHandler}
          ></input>

          <label>S</label>
          <input type="number" value={qSmall} onChange={QSmallHandler}></input>
        </div>
        <button onClick={AddProductHandler}>Add Product</button>
      </form>
      <button onClick={props.onClick}>
        <span>T-Shirt Cart </span>
        <span>
          {" "}
          -{" "}
          {cartcntx.PrdtList.reduce(
            (a, v) =>
              (a =
                Number(a) +
                Number(
                  Number(v.quantityLarge) +
                    Number(v.quantityMedium) +
                    Number(v.quantitySmall)
                )),
            0
          )}{" "}
          -{" "}
        </span>
      </button>
      <ul>
        {productList.map((pitem) => {
          return (
            <li style={{ listStyle: "none" }} key={pitem.id}>
              {pitem.tshirt} - {pitem.description} -{pitem.price}
              <button onClick={() => QuantityHandler(pitem, "large")}>
                Large({pitem.qLarge})
              </button>
              <button onClick={() => QuantityHandler(pitem, "medium")}>
                Medium({pitem.qMedium})
              </button>
              <button onClick={() => QuantityHandler(pitem, "small")}>
                Small({pitem.qSmall})
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TShirtShopping;
