import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  totalCoins: 0,
  userId: null,
  totalMoneySpent: 0,
  totalOrders: 0,
  maxProductVarieties: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: ()=>{},
  updateUserStats: (stats) => {},
});

export default CartContext;