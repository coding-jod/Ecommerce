import { useContext, useEffect, useState } from 'react';

import MealItemForm from './MealItemForm.js';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context.js';
import kurti from "../../../assets/kurti.png";
import jeans from "../../../assets/jeans.png";
import sunglass from "../../../assets/sunglasses.png";
import toy from "../../../assets/softtoy.png";
import gold from "../../../assets/Gold Coin2.png";

// import 
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `₹ ${props.price.toFixed(2)}`;
  // const image ={kurti};
  const [image,setImage]= useState(toy);
  useEffect(()=>{
    if(props.image==="kurti") setImage(kurti);
    if(props.image==="jeans") setImage(jeans);
    if(props.image==="sunglass") setImage(sunglass);


  },[props.image]);

  

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
      
    });
  };

  return (
    <li className={classes.meal}>
      <span><div><img className={classes.photo}  src={image} alt='h'></img></div></span>
      <span>
      <div>
        <h3 className={classes.name}>{props.name} </h3>
        <div ><span className={classes.description}>{props.description}</span> <span className={classes.review}>{props.review}</span></div>
        <span className={classes.price}>{price}</span>
        <span className={classes.coins}><img className={classes.coinn} alt="h" src={gold}></img></span>
        <span>{props.price*0.05}</span>
        {/* <div className={classes.review}>4 </div> */}
      </div>
      </span>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
