
import React , { useState } from "react";

const TShirtShopping =(props) =>{

    const [tshirt , setTshirt] =useState("")
    const [description , setDescription] =useState("")
    const [price , setPrice] =useState("")
    const [qLarge , setQLarge] =useState("")
    const [qMedium , setQMedium] =useState("")
    const [qSmall , setQSmall] =useState("")
    const [productList , setProductList] =useState([])

    const TshirtHandler = (event)=>{
        setTshirt(event.target.value)
    }

    const DescriptionHandler = (event)=>{
        setDescription(event.target.value)
    }
    const PriceHandler = (event)=>{
        setPrice(event.target.value)
    }

    const QLargeHandler = (event)=>{
        setQLarge(event.target.value)
    }

    const QMediumHandler = (event)=>{
        setQMedium(event.target.value)
    }

    const QSmallHandler = (event)=>{
        setQSmall(event.target.value)
    }

    
    const AddProductHandler =(event) =>{
        event.preventDefault();

        setProductList ((prevList) =>{
            const ProductItems = [...prevList , 
                {
                    id:Math.random().toString(),
                    tshirt:tshirt,
                    description:description,
                    price:price,
                    qLarge:qLarge,
                    qMedium:qMedium,
                    qSmall:qSmall
                }]

                return ProductItems;

        })

        setTshirt("");
        setDescription("");
        setPrice("");
        setQLarge("");
        setQMedium("");
        setQSmall("");


    }

    return(
        <div>
        <form>
            <label>T-Shirt </label>
            <input 
            type="text"
            value={tshirt}
            onChange={TshirtHandler}
            ></input>

            <label>Description </label>
            <input 
            type="text"
            value={description}
            onChange={DescriptionHandler}
            ></input>

            <label>Price </label>
            <input 
            type="number"
            value={price}
            onChange={PriceHandler}
            ></input>
            
            <div>
            <label>Quantity Available</label>
            <label>  L   </label>
            <input 
            type="number"
            value={qLarge}
            onChange={QLargeHandler}
            ></input>

            <label>  M  </label>
            <input 
            type="number"
            value={qMedium}
            onChange={QMediumHandler}
            ></input>

            <label>S</label>
            <input 
            type="number"
            value={qSmall}
            onChange={QSmallHandler}
            ></input>

            </div>
            <button onClick={AddProductHandler}>Add Product</button>
            <ul>
                {productList.map((pitem) => {
                    return(<li style={{listStyle:"none"}} key={pitem.id}>
                        {pitem.tshirt} - {pitem.description} -{pitem.price}
                        <button>Large({pitem.qLarge})</button>
                        <button>Medium({pitem.qMedium})</button>
                        <button>Small({pitem.qSmall})</button>
                    </li>)
                })}
            </ul>
        </form>
        <button onClick={props.onClick}>
        <span>T-Shirt Cart </span>
        <span> - {0} - </span>
      </button>
      </div>
    )

}

export default TShirtShopping;