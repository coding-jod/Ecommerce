// import { Fragment } from "react";
// import { useContext, useState } from "react";
// import Checkout from "./Checkout.js";
// import Modal from "../UI/Modal.js";
// import CartItem from "./CartItem.js";
// import classes from "./Cart.module.css";
// import CartContext from "../../store/cart-context.js";
// import gold from "../../assets/Gold Coin2.png";
// import { doc, setDoc, getFirestore } from 'firebase/firestore';

// const Cart = (props) => {
//   const cartCtx = useContext(CartContext);
//   const [isClicked, setIsClicked] = useState(false);
//   const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
//   const totalCoins = `${cartCtx.totalCoins.toFixed(2)}`;

//   const hasItems = cartCtx.items.length > 0;
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [didSubmit, setDidSubmit] = useState(false);

//   const orderButtonOnCLickHandler = () => {
//     setIsClicked(true);
//   };
//   const cartItemRemoveHandler = (id) => {
//     cartCtx.removeItem(id);
//   };

//   const cartItemAddHandler = (item) => {
//     cartCtx.addItem(item);
//   };
//   const SubmitHandler = async (userData) => {
//     setIsSubmitting(true);
    
//     // Replace with your Firestore instance and document path
//     const db = getFirestore();
//     const userDocRef = doc(db, "users", cartCtx.userId); // Make sure cartCtx.userId is set correctly

//     try {
//       // Add order to Firebase Realtime Database
//       await fetch("https://react-meals-6a158-default-rtdb.firebaseio.com/orders.json", {
//         method: "POST",
//         body: JSON.stringify({
//           user: userData,
//           cart: cartCtx.items,
//         }),
//       });

//       // Update user document in Firestore
//       await setDoc(userDocRef, {
//         totalAmountSpent: cartCtx.totalAmount + cartCtx.totalAmountSpent, // Adjust field names as necessary
//         totalCoins: cartCtx.totalCoins,
//         totalOrders: (cartCtx.totalOrders || 0) + 1,
//         maxProductVarieties: cartCtx.maxProductVarieties, // Adjust field names as necessary
//       }, { merge: true });

//       // Clear cart and update context
//       cartCtx.clearCart();
//       setIsSubmitting(false);
//       setDidSubmit(true);
//     } catch (error) {
//       console.error("Error submitting order:", error);
//       setIsSubmitting(false);
//     }
//   };
//   const cartItems = (
//     <ul className={classes["cart-items"]}>
//       {cartCtx.items.map((item) => (
//         <CartItem
//           key={item.id}
//           name={item.name}
//           amount={item.amount}
//           price={item.price}
//           onRemove={cartItemRemoveHandler.bind(null, item.id)}
//           onAdd={cartItemAddHandler.bind(null, item)}
//         />
//       ))}
//     </ul>
//   );
//   const modalActions = (
//     <div className={classes.actions}>
//       <button className={classes["button--alt"]} onClick={props.onClose}>
//         Close
//       </button>
//       {hasItems && (
//         <button
//           disabled={isClicked}
//           className={classes.button}
//           onClick={orderButtonOnCLickHandler}
//         >
//           Order
//         </button>
//       )}
//     </div>
//   );
//   const modalDisplay = (
//     <Fragment>
//       {cartItems}
//       <div className={classes.total}>
//         <div>
//         <span>Total Amount: </span>
//         <span>{totalAmount}</span>
//         </div>
//         <span className={classes.rewards}>Earnings: {totalCoins} coins </span>
//       </div>

//       {isClicked && (
//         <Checkout onConfirm={SubmitHandler} onCancel={props.onClose} />
//       )}
//       {!isClicked && modalActions}
//     </Fragment>
//   );
//   const ModalSubmitting = <p>Submitting the details...</p>;
//   const ModalSubmitted = (
//     <Fragment>
//       <p>Your Order was placed successfully.</p>
//       <div className={classes.actions}>
//       <button className={classes["button--alt"]} onClick={props.onClose}>
//         Close
//       </button>
//     </div>
//     </Fragment>
//   );
//   return (
//     <Modal onClose={props.onClose}>
//       {!isSubmitting && !didSubmit && modalDisplay}
//       {isSubmitting && !didSubmit && ModalSubmitting}
//       {!isSubmitting && didSubmit && ModalSubmitted}
//     </Modal>
//   );
// };

// export default Cart;

import { Fragment } from "react";
import { useContext, useState } from "react";
import Checkout from "./Checkout.js";
import Modal from "../UI/Modal.js";
import CartItem from "./CartItem.js";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context.js";
import gold from "../../assets/Gold Coin2.png";
import { doc, setDoc, getFirestore, getDoc } from 'firebase/firestore';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isClicked, setIsClicked] = useState(false);
  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const totalCoins = `${cartCtx.totalCoins.toFixed(2)}`;
  console.log(cartCtx.userId);
  console.log(cartCtx.totalOrders);

  const hasItems = cartCtx.items.length   > 0;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const orderButtonOnCLickHandler = () => {
    setIsClicked(true);
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const SubmitHandler = async (userData) => {
    setIsSubmitting(true);

    const userId = cartCtx.userId;

    if (!userId) {
      console.error("User ID is missing");
      setIsSubmitting(false);
      return;
    }

    const db = getFirestore();
    const userDocRef = doc(db, "users", userId);

    try {
      // Add order to Firebase Realtime Database
      await fetch("https://react-meals-6a158-default-rtdb.firebaseio.com/orders.json", {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          cart: cartCtx.items,
        }),
      });

      // Update user document in Firestore
      await setDoc(userDocRef, {
        totalMoneySpent: cartCtx.totalAmount + cartCtx.totalMoneySpent,
        // totalCoins: cartCtx.totalCoins,
        totalOrders: (cartCtx.totalOrders || 0) + 1,
        maxProductVarieties: cartCtx.maxProductVarieties,
      }, { merge: true });

      // Clear cart and update context
      cartCtx.clearCart();
      // cartCtx.updateUserStats(userId); // Update context
      const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      cartCtx.updateUserStats(userDocSnapshot.data());
    }
    cartCtx.setUid(userId);
      setIsSubmitting(false);
      setDidSubmit(true);
    } catch (error) {
      console.error("Error submitting order:", error);
      setIsSubmitting(false);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button
          disabled={isClicked}
          className={classes.button}
          onClick={orderButtonOnCLickHandler}
        >
          Order
        </button>
      )}
    </div>
  );
  const modalDisplay = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <div>
        <span>Total Amount: </span>
        <span>{totalAmount}</span>
        </div>
        <span className={classes.rewards}>Earnings: {totalCoins} coins </span>
      </div>

      {isClicked && (
        <Checkout onConfirm={SubmitHandler} onCancel={props.onClose} />
      )}
      {!isClicked && modalActions}
    </Fragment>
  );
  const ModalSubmitting = <p>Submitting the details...</p>;
  const ModalSubmitted = (
    <Fragment>
      <p>Your Order was placed successfully.</p>
      <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
    </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && modalDisplay}
      {isSubmitting && !didSubmit && ModalSubmitting}
      {!isSubmitting && didSubmit && ModalSubmitted}
    </Modal>
  );
};

export default Cart;
