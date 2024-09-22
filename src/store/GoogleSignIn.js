
import React, { useState, useContext,useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, provider, db } from "./firebase.js"; // Import Firestore instance
import CartContext from "./cart-context.js"; // Import your context

const GoogleSignIn = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const cartCtx = useContext(CartContext);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Update the login status based on user state
//     if (user) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, [user]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      

      console.log("Google Sign-in successful. User data:", user);

      // Save UID to context
      if (user && cartCtx.setUid) {
        console.log("Setting UID in context:", user.uid);
        cartCtx.setUid(user.uid);
        console.log(cartCtx.userId);
      } else {
        console.error("User or setUid is not available in CartContext");
      }

      // Create user document if it does not exist
      await createUserDocumentIfNotExists(user);

    } catch (error) {
      setError(error.message);
      console.error("Sign-in error:", error);
    }
  };

  const createUserDocumentIfNotExists = async (user) => {
    const userRef = doc(db, "users", user.uid);
    try {
      const docSnapshot = await getDoc(userRef);
      if (!docSnapshot.exists()) {
        await setDoc(userRef, {
          totalMoneySpent: 0,
          totalOrders: 0,
          maxProductVarieties: 0,
        });
        console.log("User document created successfully.");
      } else {
        console.log("User document already exists.");
      }
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  };

  return (
    <>
    {!user && <button  onClick={signInWithGoogle} style={{ marginLeft: '20px' }}>Sign in with Google</button> }
    {user && <span style={{ color: "black", marginLeft: "20px"}}>Hello, {user.displayName}!</span>}
    </>
  );
};

export default GoogleSignIn;
