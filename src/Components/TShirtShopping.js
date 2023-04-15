
import React , { useState , useContext } from "react";

import CartContext from "../store/CartContext";

const TShirtShopping =(props) =>{

    const cartcntx = useContext(CartContext);

    const [tshirt , setTshirt] =useState("")
    const [description , setDescription] =useState("")
    const [price , setPrice] =useState("")
    const [qLarge , setQLarge] =useState("")
    const [qMedium , setQMedium] =useState("")
    const [qSmall , setQSmall] =useState("")
    const [productList , setProductList] =useState([])

    // console.log("Productlist",productList)
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

        if(tshirt==="" || description==="" || price==="" || qLarge==="" || qMedium==="" ||qSmall===""){
            alert("Please enter valid data")
            return;
        }

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

    const LQuantityHandler = (item) =>{
        // console.log("item",item)

        let qLarge = Number(item.qLarge) - 1
        
        productList.map((product)=>{
            // console.log("product",product)
            if(product.id===item.id)
            {
                // console.log("Large",{...product,qLarge:qLarge})
                const large = {...product,qLarge:qLarge}
                if(qLarge>=0){
                    const updateList=productList.filter(pdt =>pdt.id !==item.id)
                    // setProductList([large,...updateList])
                    setProductList([...updateList,large])
                    cartcntx.addProduct({...item ,quantityLarge:1,quantityMedium:0,quantitySmall:0})
                }
                

            }
        })
        
        
    }

    const MQuantityHandler = (item) =>{
        
        // cartcntx.addProduct({...item,quantityLarge:0,quantityMedium:1,quantitySmall:0})
        let qMedium = Number(item.qMedium) - 1
        
        productList.map((product)=>{
            // console.log("product",product)
            if(product.id===item.id)
            {
                // console.log("Large",{...product,qLarge:qLarge})
                const Medium = {...product,qMedium:qMedium}
                if(qMedium>=0){
                    const updateList=productList.filter(pdt =>pdt.id !==item.id)
                    setProductList([...updateList,Medium])
                    cartcntx.addProduct({...item ,quantityLarge:0,quantityMedium:1,quantitySmall:0})
                }
                

            }
        })
    }

    const SQuantityHandler = (item) =>{
        
        // cartcntx.addProduct({...item,quantityLarge:0,quantityMedium:0,quantitySmall:1})

        let qSmall = Number(item.qSmall) - 1
        
        productList.map((product)=>{
            // console.log("product",product)
            if(product.id===item.id)
            {
                // console.log("Large",{...product,qLarge:qLarge})
                const Small = {...product,qSmall:qSmall}
                if(qSmall>=0){
                    const updateList=productList.filter(pdt =>pdt.id !==item.id)
                    setProductList([...updateList,Small])
                    cartcntx.addProduct({...item ,quantityLarge:0,quantityMedium:0,quantitySmall:1})
                }
                

            }
        })
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
            </form>
            <ul>
                {productList.map((pitem) => {
                    return(<li style={{listStyle:"none"}} key={pitem.id}>
                        {pitem.tshirt} - {pitem.description} -{pitem.price}
                        <button onClick={() => LQuantityHandler(pitem)}>Large({pitem.qLarge})</button>
                        <button onClick={() =>MQuantityHandler(pitem)}>Medium({pitem.qMedium})</button>
                        <button onClick={() =>SQuantityHandler(pitem)}>Small({pitem.qSmall})</button>
                    </li>)
                })}
            </ul>
        
        <button onClick={props.onClick}>
        <span>T-Shirt Cart </span>
        <span> - {cartcntx.PrdtList.reduce((a,v)=>(a=Number(a)+(Number(v.quantityLarge+v.quantityMedium+v.quantitySmall))),0)} - </span>
      </button>
      </div>
    )

}

export default TShirtShopping;