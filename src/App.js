import { useContext, useState } from 'react';

import Header from './components/Layout/Header.js';
import Meals from './components/Meals/Meals.js';
import Cart from './components/Cart/Cart.js';
import CartProvider from './store/CartProvider.js';
import RewardsPage from './RewardsPage/RewardsPage.js';
import CartContext from './store/cart-context.js';
// import Modal from './components/UI/Modal.js';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [rewardsIsShown, setRewardsIsShown] =useState(false);
  // const cartctx= useContext(CartContext);
  
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showRewardsHandler = () => {
    setRewardsIsShown(true);
  };

  const hideRewardsHandler = () => {
    setRewardsIsShown(false);
  };


  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {rewardsIsShown && <RewardsPage onClose={hideRewardsHandler}></RewardsPage>}
      <Header onShowCart={showCartHandler} onshowRewards={showRewardsHandler} />
      <main>
        <Meals />
        
        {/* <RewardsPage></RewardsPage> */}
      </main>
    </CartProvider>
  );
}

export default App;
