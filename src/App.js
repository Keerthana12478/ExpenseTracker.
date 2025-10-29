import React, { useEffect, useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BudgetCircle from './components/BudgetCircle';
import Loader from './components/Loader';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/expenses/").then(res => res.json()).then(setExpenses);
    fetch("/budget/").then(res => res.json()).then(data => {
      if (data.length) setBudget(data[0].total);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget - totalSpent;

  return (
    <div className="container">
      <h1>My Budget Manager</h1>
      <BudgetCircle total={budget} spent={totalSpent} />
      <ExpenseForm refresh={() => window.location.reload()} />
      <ExpenseList expenses={expenses} refresh={() => window.location.reload()} />
      <button className="clear-btn" onClick={() => {
        fetch('/clear/', { method: 'DELETE' }).then(() => window.location.reload());
      }}>Clear All</button>
      <p className="remaining">Remaining: ₹{remaining.toFixed(2)}</p>
    </div>
  );
}

export default App;
