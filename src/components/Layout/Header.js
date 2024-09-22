import { Fragment, useContext, useState,useEffect } from 'react';

import HeaderCartButton from './HeaderCartButton.js';
import mealsImage from '../../assets/bigphot.png';
import classes from './Header.module.css';
import GoogleSignIn from '../../store/GoogleSignIn.js';
import CartContext from '../../store/cart-context.js';
import gold from "../../assets/Gold.png";
import silver from "../../assets/Silver.png";
import bronze from "../../assets/Bronze.png";
import smartcoin from "../../assets/Gold Coin2.png";

const Header = (props) => {
  const cartctx = useContext(CartContext);
  const [medal, setMedal] = useState(gold);
  const totalcoin= (0.05*cartctx.totalMoneySpent).toFixed(2);
  const [rewards,setRewards] =useState(false);
  const [tier,settier]= useState("Bronze");

  useEffect(() => {
    if (cartctx.totalMoneySpent <= 2000) {
      setMedal(bronze); settier("Bronze")
    } else if (cartctx.totalMoneySpent > 2000 && cartctx.totalMoneySpent <= 15000) {
      setMedal(silver); settier("Silver");
    } else {
      setMedal(gold); settier("Gold");
    }
  }, [cartctx.totalMoneySpent]); 

  // const onClickHandler= () => {
  //   setRewards(true);


  // };
  return (
    <Fragment>
      
      <header className={classes.header}>
        <h1>meesho</h1>
        <div className={classes['medal-container']}>
          
        <img src={medal} className={classes.medal} onClick={props.onshowRewards}></img>
        <span>{tier} Member</span>
        <span className={classes.rewards}> <img src={smartcoin} onClick={props.onshowRewards}></img> </span> 
        <span className={classes.rewards}> <p>{totalcoin}</p></span>

        <HeaderCartButton onClick={props.onShowCart} />
        </div>

      </header>
      
      <div className='' >
        <img src={mealsImage} ></img>
      </div>

    </Fragment>
  );
};

export default Header;
