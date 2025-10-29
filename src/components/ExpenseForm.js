import React, { useState } from 'react';

export default function ExpenseForm({ refresh }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = () => {
    fetch('/expenses/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, amount: parseFloat(amount) })
    }).then(() => refresh());
  };

  return (
    <div className="form">
      <input placeholder="Expense Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Amount ₹" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={addExpense}>Add</button>
    </div>
  );
}


