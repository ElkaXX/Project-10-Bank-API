import React from "react";
import "../css/transactions.css";
import Layout from "../components/Layout";

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  balance: number;
}

const Transactions: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: 1,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: 5.0,
      balance: 2082.79,
    },
    {
      id: 2,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: 10.0,
      balance: 2087.79,
    },
    {
      id: 3,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: 20.0,
      balance: 2097.79,
    },
    {
      id: 4,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: 30.0,
      balance: 2117.79,
    },
    {
      id: 5,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: 40.0,
      balance: 2147.79,
    },
    {
      id: 6,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: 50.0,
      balance: 2187.79,
    },
  ];

  return (
    <Layout>
      <main className="main-content">
        <h2>Argent Bank Checking (x8349)</h2>
        <p>$2,082.79 Available Balance</p>

        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>${transaction.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </Layout>
  );
};

export default Transactions;
