import React, { useContext, useEffect, useState } from "react";
import goldCoin from "../assets/Gold Coin2.png"; // Assuming you have coin icons
import bronzeIcon from "../assets/Bronze.png"; // Assuming you have tier icons
import Modal from "../components/UI/Modal.js";
import CartContext from "../store/cart-context.js";
import gold from "../assets/Gold.png";
import silver from "../assets/Silver.png";
import bronze from "../assets/Bronze.png";

const RewardsPage = (props) => {
    const cartctx =useContext(CartContext);
    const money=cartctx.totalMoneySpent;
    const coins=(0.05*money).toFixed(2);
    const [tier,setTier] = useState(bronze);
    const [tiername,settiername] =useState("Bronze");

    useEffect(()=>{
        if(money>2000 && money<=15000) { setTier(silver); settiername("Silver");}
        else if(money>15000) { setTier(gold); settiername("Gold"); }
    },[money]);
  return (
    <Modal onclose={props.onClose}>
  {/* overflow: auto; */}
  <div style={styles.scroll}>
    <div style={styles.container}>
      {/* Balance and Tier Section */}
      <div style={styles.headerSection}>
        <div style={styles.smartcoins}>    
          <h3>🪙 Balance : {coins}</h3>
          <p>1 🪙SmartCoin = 1 ₹ discount</p>
          <p>Use 🪙SmartCoins to get upto 10% off on any product</p>
        </div>
        <div style={styles.verticalflex}>
          <div>
            <strong>Current Tier :</strong> <span style={styles.bronzeText}>{tiername} </span>
            <img src={tier} alt="bronze tier" style={styles.tierIcon} />
          </div>
          <p>A higher tier ensures better rewards.</p>
          <div style={styles.tierLevels}>
            <div style={styles.bronze}>Bronze &lt;2000 Total Spend</div>
            <div style={styles.silver}>Silver &lt;15000 Total Spend</div>
            <div style={styles.gold}>Gold &gt;15000 Total Spend</div>
          </div>
        </div>
      </div>

      {/* Upcoming Milestones Section */}
      <div style={styles.milestonesContainer}>
        <h4>Upcoming Milestones</h4>
        <div style={styles.milestones}>
          <div style={styles.milestone}>
            <img src={goldCoin} alt="coin" style={styles.coinIcon} />
            <p>+20</p>
            <p>Provide 10 product reviews</p>
          </div>
          <div style={styles.milestone}>
            <img src={goldCoin} alt="coin" style={styles.coinIcon} />
            <p>+150</p>
            <p>Complete 30 orders</p>
          </div>
          <div style={styles.milestone}>
            <img src={goldCoin} alt="coin" style={styles.coinIcon} />
            <p>+600</p>
            <p>Spend a total of ₹10,000</p>
          </div>
          <div style={styles.milestone}>
            <img src={goldCoin} alt="coin" style={styles.coinIcon} />
            <p>+100</p>
            <p>Order from 10 product varieties</p>
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div style={styles.rewardsContainer}>
        <h4>{tiername} Tier Rewards</h4>
        <div style={styles.rewards}>
          <div style={styles.reward}>
            <p>Extra 10% discount on Football Shoes</p>
            <button style={styles.claimButton}>Claim now ></button>
          </div>
          <div style={styles.reward}>
            <p>Extra 10% discount on Boat Speakers</p>
            <button style={styles.claimButton}>Claim now ></button>
          </div>
          <div style={styles.reward}>
            <p>₹500 off on Puma Active-wear Tshirts</p>
            <button style={styles.claimButton}>Claim now ></button>
          </div>
        </div>
      </div>
    </div>
    <button onClick={props.onClose}>Close</button>
    </div>
    </Modal>
  );
};

// CSS styles for layout and structure
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#590a46",
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    padding: "20px",
    borderBottom: "2px dotted #d3a4d4",
  },
  bronzeText: {
    color: "#d17740",
    fontWeight: "bold",
  },
  tierIcon: {
    width: "24px",
    height: "24px",
    marginLeft: "5px",
  },
  tierLevels: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "10px",
  },
  bronze: {
    backgroundColor: "#d17740",
    padding: "5px",
    borderRadius: "5px",
    color: "white",
    flex: 1,
    marginRight: "10px",
  },
  silver: {
    backgroundColor: "#c0c0c0",
    padding: "5px",
    borderRadius: "5px",
    color: "white",
    flex: 1,
    marginRight: "10px",
  },
  gold: {
    backgroundColor: "#ffd700",
    padding: "5px",
    borderRadius: "5px",
    color: "white",
    flex: 1,
  },
  milestonesContainer: {
    textAlign: "center",
    borderBottom: "2px dotted #d3a4d4",
    paddingBottom: "20px",
    marginBottom: "20px",
  },
  milestones: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  milestone: {
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
    width: "150px",
  },
  coinIcon: {
    width: "24px",
    height: "24px",
  },
  rewardsContainer: {
    padding: "10px",
  },
  rewards: {
    display: "flex",
    justifyContent: "space-around",
  },
  reward: {
    textAlign: "center",
    backgroundColor: "#f0e1f0",
    padding: "10px",
    borderRadius: "10px",
    width: "30%",
  },
  claimButton: {
    marginTop: "10px",
    backgroundColor: "#d17740",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
  },
  scroll: {
    overflowY: "auto",
    maxHeight: "50vh", 
    maxWidth: "100%" // corrected property syntax
  },
  verticalflex: {
    // paddingLeft: "25px",
    marginTop: "-22px",
  },
  smartcoins: {
    // maxWidth: "60%",
  }
};

export default RewardsPage;
