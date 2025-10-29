import React, { useState } from 'react';

export default function BudgetCircle({ total, spent }) {
  const [input, setInput] = useState(total);
  const percent = total ? Math.min((spent / total) * 100, 100) : 0;

  const updateBudget = () => {
    fetch('/budget/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total: parseFloat(input) })
    }).then(() => window.location.reload());
  };

  return (
    <div className="circle-container">
      <div className="progress-circle" style={{ background: `conic-gradient(#ff66b2 ${percent * 3.6}deg, #222 0deg)` }}>
        <div className="inner">
          <span>{percent.toFixed(0)}% used</span>
        </div>
      </div>
      <div className="budget-input">
        <input placeholder="Set Budget ₹" value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={updateBudget}>Save</button>
      </div>
    </div>
  );
}


