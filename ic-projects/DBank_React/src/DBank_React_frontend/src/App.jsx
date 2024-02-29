import React, { useState,useEffect } from 'react';
// import './main.css'; // Import your CSS file
import DBankLogo from '/dbank-logo.png';
import {DBank_React_backend} from '../../declarations/DBank_React_backend';



function App() {
  // State variables
  const [balance, setBalance] = useState(null);
  const [topUpAmount, setTopUpAmount] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState(null);

// Fetch Balance
const fetchBalance = async () => {
  try {
    const balance = await DBank_React_backend.checkBalance();
    setBalance(balance);
  } catch (error) {
    console.error("Error occurred while fetching balance:", error);
  }
};

  useEffect(() => {
    fetchBalance();
  }, [topUpAmount,withdrawalAmount,balance]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Parse top-up amount
    let parsedTopUpAmount = parseFloat(topUpAmount);
    if (isNaN(parsedTopUpAmount) || parsedTopUpAmount < 0) {
      console.error("Invalid top-up amount");
      parsedTopUpAmount = 0; // Set to 0 if NaN or negative
    }
    
    // Parse withdrawal amount
    let parsedWithdrawalAmount = parseFloat(withdrawalAmount);
    if (isNaN(parsedWithdrawalAmount) || parsedWithdrawalAmount < 0) {
      console.error("Invalid withdrawal amount");
      parsedWithdrawalAmount = 0; // Set to 0 if NaN or negative
    }
    
    // Call APIs with parsed amounts
    try {
      await DBank_React_backend.topUp(parsedTopUpAmount);
      await DBank_React_backend.withdraw(parsedWithdrawalAmount);
      console.log('Transaction finalized');
    } catch (error) {
      console.error("Error occurred during transaction:", error);
    }
    fetchBalance();
  };
  
  return (
    <div className="container">
      <img src={DBankLogo} alt="DBank logo" width="100"/>
      <h1>Current Balance: <span id="value">${balance !== null ? balance.toFixed(2) : ' Loading...'}</span></h1>
      <div className="divider"></div>
      <form onSubmit={handleSubmit}>
        <h2>Amount to Top Up</h2>
        <input
          id="input-amount"
          type="number"
          step="0.01"
          min="0"
          name="topUp"
          value={topUpAmount}
          onChange={(e) => setTopUpAmount(e.target.value)}
        />
        <h2>Amount to Withdraw</h2>
        <input
          id="withdrawal-amount"
          type="number"
          step="0.01"
          min="0"
          name="withdraw"
          value={withdrawalAmount}
          onChange={(e) => setWithdrawalAmount(e.target.value)}
        />
        <input id="submit-btn" type="submit" value="Finalise Transaction" />
      </form>
    </div>
  );
}

export default App;
