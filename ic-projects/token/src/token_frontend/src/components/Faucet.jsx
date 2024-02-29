import React, { useState } from "react";
import { token_backend, canisterId, createActor } from "../../../declarations/token_backend"
import { AuthClient } from "@dfinity/auth-client";


function Faucet() {
  const [isDisabled,setDisabled] = useState(false);
  const [buttonText,setButtonText] = useState("Free Tokens");

  async function handleClick(event) {
    setDisabled(true);

    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId,{
      agentOptions: {
        identity,
      },
    });
    // const result = await authenticatedCanister.payOut(); // For Internet testing
    const result = await token_backend.payOut(); // For Local testing
    setButtonText(result);
    // setDisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={isDisabled}
        >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
