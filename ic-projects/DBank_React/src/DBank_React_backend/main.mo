import Debug "mo:base/Debug";
import Deque "mo:base/Deque";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor {
  // public query func greet(name : Text) : async Text {
  //   return "Hello, " # name # "!";
  // };

  var currentValue = 300;
  currentValue := 100;

  let fixedValue = 400;
  // fixedValue := 100; Not working

  // Debug.print(debug_show(fixedValue))

  // Function declare in public rn via command line below
  // dfx canister call dbank_backend topUp
  // It's important to close function ';'
  // topUp();

  // Allow users to withdrawl an amount fro the current Value
  // Decrease the current by the amount

  // public func withdrawl (amount: Nat) {
  //   currentValue -= amount;
  //   Debug.print(debug_show(currentValue));
  // }
  // stable keyword is memorize last operation change value even your system restart
  var amount : Float = 1000;

  public func setNewAmount(newAmount: Float) {
      amount := newAmount
  };

  public func topUp(deposit_value : Float) {
    amount += deposit_value;
    Debug.print(debug_show(amount))
  };
  public func withdraw(withdraw: Float) {
    let tempAmount : Float = amount - withdraw;
    if (0 <= tempAmount) {
      amount -= withdraw;
      Debug.print(debug_show(amount))
    }else{
      Debug.print("Amount is greter than currentValue")
    }

  };
  // fatch any value that way
  public query func checkBalance(): async Float {
    return amount;
  };

  stable var startTime = Time.now();
  Debug.print(debug_show(startTime));

  public func compound(){
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;
    amount := amount * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
  }

};
