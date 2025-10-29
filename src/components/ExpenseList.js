import React from 'react';

export default function ExpenseList({ expenses, refresh }) {
  return (
    <ul className="list">
      {expenses.map(e => (
        <li key={e.id}>
          {e.title} — ₹{e.amount.toFixed(2)}
          <button onClick={() => {
            fetch(`/expenses/${e.id}`, { method: 'DELETE' }).then(() => refresh());
          }}>X</button>
        </li>
      ))}
    </ul>
  );
}


