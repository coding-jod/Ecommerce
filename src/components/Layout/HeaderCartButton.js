import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon.js";
import CartContext from "../../store/cart-context.js";
import classes from "./HeaderCartButton.module.css";
import gold from "../../assets/Gold Coin.png";
import GoogleSignIn from "../../store/GoogleSignIn.js";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items, totalMoneySpent } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <>
      <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
      <span className={classes.badge}>{numberOfCartItems}</span>

      </button>
      <span>
        <GoogleSignIn />
      </span>
    </>
  );
};

export default HeaderCartButton;
