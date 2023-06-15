// Transaction.js based on Deposit.js, has Deposit and Withdraw functionality
import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import Card from "react-bootstrap/Card";
import "./styles/Card.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export function Transaction({loggedInUser, updateUser, updateUserBalance}) {
  const [amount, setAmount] = useState("");
  // const ctx = useContext(UserContext); <-- error, never used
  const [status, setStatus] = useState("");

  const handleDeposit = () => {
    if (!validate(amount, "amount")) return;
    const updatedUser = { ...loggedInUser, balance: loggedInUser.balance + Number(amount) };
    updateUser(updatedUser);
    updateUserBalance(updatedUser);
    showDepositSuccess();
  };

  const handleWithdraw = () => {
    if (!validate(amount, "amount")) return;
    const updatedUser = { ...loggedInUser, balance: loggedInUser.balance - Number(amount) };
    updateUser(updatedUser);
    updateUserBalance(updatedUser);
    showWithdrawSuccess();
  };

  function reset() {
    setTimeout(() => {
      setStatus("");
      setAmount("");
    }, 4000);
  }

  function showDepositSuccess() {
    setStatus(`Your deposit of $${amount} was successful!`)
    reset();
  }

  function showWithdrawSuccess() {
    setStatus(`Your withdrawl of $${amount} was successful!`)
    reset();
  }

  function validate(field, label) {

    if (isNaN(field)) {
      setStatus("Error: " + label + " should be a number.");
      reset();
      return false;
    } else if (Number(field) < 0) {
      setStatus("Error: " + label + " cannot be negative.");
      reset();
      return false;
    }
    else if (!field) {
      setStatus("Error: " + label + " cannot be empty.");
      reset();
      return false;
    }
    return true;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ width: "35rem" }}>
        <Card.Img
          variant="top"
          src={`${process.env.PUBLIC_URL}/images/image-deposit.jpg`}
          alt="card image cap"
        />
        <Card.Body>
          <Card.Title>Transaction</Card.Title>
          <Card.Text>Your current balance is ${loggedInUser.balance}</Card.Text>
          <Form>
            <input
              type="text"
              className="form-control"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.currentTarget.value)}
            />
            <br />
            {status && <p>{status}</p>}
            <Button type="button" className="btn btn-light" onClick={handleDeposit} disabled={status !== "" || amount === ""}>
            Deposit
            </Button>
            <Button type="button" className="btn btn-light" onClick={handleWithdraw} disabled={status !== "" || amount === ""}>
            Withdraw
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Transaction;