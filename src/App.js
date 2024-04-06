import React, { useState } from "react";
import "./styles.css";

function App() {
  const [balance, setBalance] = useState(1.0);
  const [income, setIncome] = useState(1.0);
  const [expense, setExpense] = useState(0.0);
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const addTransaction = (e) => {
    e.preventDefault();
    if (text.trim() === "" || amount === "") return;
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: parseFloat(amount),
    };
    setTransactions([...transactions, newTransaction]);
    const newBalance = balance + newTransaction.amount;
    setBalance(newBalance);
    if (newTransaction.amount > 0) {
      setIncome(income + newTransaction.amount);
    } else {
      setExpense(expense + Math.abs(newTransaction.amount));
    }
    setText("");
    setAmount("");
  };

  return (
    <div className="container">
      <h1>YOUR BALANCE</h1>
      <div className="balance">${balance.toFixed(2)}</div>
      <div className="section">
        <h2>INCOME</h2>
        <div className="income">${income.toFixed(2)}</div>
      </div>
      <div className="section">
        <h2>EXPENSE</h2>
        <div className="expense">${expense.toFixed(2)}</div>
      </div>
      <div className="section">
        <h2>History</h2>
        <div className="history">
          {transactions.map((transaction) => (
            <div key={transaction.id}>
              <span>{transaction.text}</span>
              <span>${transaction.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h2>Add new transaction</h2>
        <form onSubmit={addTransaction}>
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
          <button type="submit">Add transaction</button>
        </form>
      </div>
    </div>
  );
}

export default App;
