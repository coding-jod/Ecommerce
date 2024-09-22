// import { useReducer } from 'react';

// import CartContext from './cart-context.js';

// const defaultCartState = {
//   items: [],
//   totalAmount: 0,
//   totalCoins : 0,
//   userId: null,
//   totalMoneySpent: 0,
//   totalOrders: 0,
//   maxProductVarieties: 0,
// };

// const cartReducer = (state, action) => { //this is a reducer to handle the state of cart when + button available in the cart has been pushed  
//   if (action.type === 'ADD') {
//     const updatedTotalAmount =
//       state.totalAmount + action.item.price * action.item.amount;
//     const updatedTotalCoins= state.totalCoins + action.item.price*0.05;

//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.id === action.item.id
//     );
//     const existingCartItem = state.items[existingCartItemIndex];
//     let updatedItems;

//     if (existingCartItem) {
//       const updatedItem = {
//         ...existingCartItem,
//         amount: existingCartItem.amount + action.item.amount,
//       };
//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     } else {
//       updatedItems = state.items.concat(action.item);
//     }

//     return {
//       items: updatedItems,
//       totalAmount: updatedTotalAmount,
//       totalCoins: updatedTotalCoins,
//     };
//   }
//   if (action.type === 'REMOVE') {
//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.id === action.id
//     );
//     const existingItem = state.items[existingCartItemIndex];
//     const updatedTotalAmount = state.totalAmount - existingItem.price;
//     const updatedTotalCoins = state.totalCoins - (existingItem.price*0.05);
//     let updatedItems;
//     if (existingItem.amount === 1) {
//       updatedItems = state.items.filter(item => item.id !== action.id);
//     } else {
//       const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     }

//     return {
//       items: updatedItems,
//       totalAmount: updatedTotalAmount,
//       totalCoins: updatedTotalCoins,
//     };
//   }
//   if(action.type==='CLEAR') return defaultCartState;
//   return defaultCartState;
// };

// const CartProvider = (props) => {
//   const [cartState, dispatchCartAction] = useReducer(
//     cartReducer,
//     defaultCartState
//   );

//   const addItemToCartHandler = (item) => {
//     dispatchCartAction({ type: 'ADD', item: item });
//   };

//   const removeItemFromCartHandler = (id) => {
//     dispatchCartAction({ type: 'REMOVE', id: id });
//   };

//   const clearCartHandler =() => {
//     dispatchCartAction({type:'CLEAR'});
//   }
//   const cartContext = {
//     items: cartState.items,
//     totalAmount: cartState.totalAmount,
//     totalCoins: cartState.totalCoins,
//     addItem: addItemToCartHandler,
//     removeItem: removeItemFromCartHandler,
//     clearCart: clearCartHandler,
//   };

//   return (
//     <CartContext.Provider value={cartContext}>
//       {props.children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;


import React, { useReducer, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";
import CartContext from "./cart-context.js";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  totalCoins: 0,
  userId: null,
  totalMoneySpent: 0,
  totalOrders: 0,
  maxProductVarieties: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const updatedTotalCoins = state.totalCoins + action.item.price * 0.05;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      totalCoins: updatedTotalCoins,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    const updatedTotalCoins = state.totalCoins - (existingItem.price * 0.05);
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      totalCoins: updatedTotalCoins,
    };
  }
  if (action.type === 'CLEAR') return defaultCartState;
  if (action.type === 'UPDATE_USER_STATS') {
    return {
      ...state,
      ...action.stats
    };
  }
  if (action.type === 'SET_USER_ID') {
    return {
      ...state,
      userId: action.userId
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (userId) {
        const userRef = doc(db, "users", userId);
        const docSnapshot = await getDoc(userRef);

        if (docSnapshot.exists()) {
          dispatchCartAction({
            type: 'UPDATE_USER_STATS',
            stats: docSnapshot.data()
          });
        }
      }
    };

    fetchUserStats();
  }, [userId]);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const updateUserStatsHandler = (stats) => {
    dispatchCartAction({ type: 'UPDATE_USER_STATS', stats });
  };
  const setUidHandler = (uid) => {
    setUserId(uid); // Update local state
    dispatchCartAction({ type: 'SET_USER_ID', userId: uid }); // Update context state
  };


  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    totalCoins: cartState.totalCoins,
    userId: cartState.userId,
    totalMoneySpent: cartState.totalMoneySpent,
    totalOrders: cartState.totalOrders,
    maxProductVarieties: cartState.maxProductVarieties,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    updateUserStats: updateUserStatsHandler,
    setUid: setUidHandler // Add a method to set the user ID
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
