import React, { useState } from "react";
import Layout from "../components/Layout";
import "../css/transactions.css";

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  balance: number;
  transactionType: string;
  category: string;
  notes: string;
}

const Transactions: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: 1,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: 5.0,
      balance: 2082.79,
      transactionType: "Electronic",
      category: "Food",
      notes: "",
    },
    {
      id: 2,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: 10.0,
      balance: 2087.79,
      transactionType: "Electronic",
      category: "Food",
      notes: "",
    },
    {
      id: 3,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: 20.0,
      balance: 2097.79,
      transactionType: "Electronic",
      category: "Food",
      notes: "",
    },
    {
      id: 4,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: 30.0,
      balance: 2117.79,
      transactionType: "Electronic",
      category: "Food",
      notes: "",
    },
    {
      id: 5,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: 40.0,
      balance: 2147.79,
      transactionType: "Electronic",
      category: "Food",
      notes: "",
    },
    {
      id: 6,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: 50.0,
      balance: 2187.79,
      transactionType: "Electronic",
      category: "Food",
      notes: "",
    },
  ];

  const [openTransactions, setOpenTransactions] = useState<number[]>([]);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editNoteId, setEditNoteId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    if (openTransactions.includes(id)) {
      setOpenTransactions(
        openTransactions.filter((transactionId) => transactionId !== id)
      );
    } else {
      setOpenTransactions([...openTransactions, id]);
    }
  };

  const handleEditCategory = (id: number) => {
    setEditCategoryId(id);
  };

  return (
    <Layout>
      <main className="main-content">
        <h4>Argent Bank Checking (x8349)</h4>
        <h2>$2,082.79</h2>
        <h4>Available Balance</h4>

        <table className="transactions-table">
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <React.Fragment key={transaction.id}>
                <tr
                  className="transaction-row"
                  onClick={() => toggleAccordion(transaction.id)}
                >
                  <td>
                    {openTransactions.includes(transaction.id) ? (
                      <i className="fa fa-caret-down" aria-hidden="true" />
                    ) : (
                      <i className="fa fa-caret-right" aria-hidden="true" />
                    )}
                  </td>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>${transaction.amount.toFixed(2)}</td>
                  <td>${transaction.balance.toFixed(2)}</td>
                </tr>

                {openTransactions.includes(transaction.id) && (
                  <tr className="transaction-details">
                    <td colSpan={5}>
                      <div className="details-content">
                        <p>
                          <strong>Transaction Type:</strong>
                          {transaction.transactionType}
                        </p>
                        <p>
                          <strong>Category:</strong>
                          {editCategoryId === transaction.id ? (
                            <>
                              <select
                                name="category"
                                defaultValue={transaction.category}
                              >
                                <option value="Food">Food</option>
                                <option value="Home">Home</option>
                              </select>
                              <i
                                className="fa fa-times"
                                aria-hidden="true"
                                onClick={() => setEditCategoryId(null)}
                              />
                            </>
                          ) : (
                            <>
                              {transaction.category}{" "}
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                                onClick={() =>
                                  handleEditCategory(transaction.id)
                                }
                              />
                            </>
                          )}
                        </p>
                        <p>
                          <strong>Notes:</strong>
                          {editNoteId === transaction.id ? (
                            <>
                              <input
                                type="text"
                                defaultValue={transaction.notes}
                              />{" "}
                              <i
                                className="fa fa-times"
                                aria-hidden="true"
                                onClick={() => setEditNoteId(null)}
                              />
                            </>
                          ) : (
                            <>
                              {" "}
                              {transaction.notes}{" "}
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                                onClick={() => setEditNoteId(transaction.id)}
                              />
                            </>
                          )}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </main>
    </Layout>
  );
};

export default Transactions;
