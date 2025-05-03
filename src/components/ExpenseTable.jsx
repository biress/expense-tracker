import React, { useState } from 'react';
import '../App.css';

function ExpenseTable({ expenses, onDelete }) {
  const [sortKey, setSortKey] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey]?.toString().toLowerCase() || '';
    const bVal = b[sortKey]?.toString().toLowerCase() || '';
    return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const getSortIndicator = (key) => {
    if (key === sortKey) {
      return sortAsc ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <div className="table-container">
      <table className="expense-table">
        <thead className="table-head">
          <tr>
            <th className="table-th" onClick={() => handleSort('name')}>
              Expense{getSortIndicator('name')}
            </th>
            <th className="table-th" onClick={() => handleSort('description')}>
              Description{getSortIndicator('description')}
            </th>
            <th className="table-th" onClick={() => handleSort('category')}>
              Category{getSortIndicator('category')}
            </th>
            <th className="table-th">Amount</th>
            <th className="table-th">Date</th>
            <th className="table-th">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {sortedExpenses.map((expense) => (
            <tr key={expense.id} className="table-row">
              <td className="table-td">{expense.name}</td>
              <td className="table-td">{expense.description}</td>
              <td className="table-td">{expense.category}</td>
              <td className="table-td">${expense.amount.toFixed(2)}</td>
              <td className="table-td">{expense.date}</td>
              <td className="table-td">
                <button
                  onClick={() => onDelete(expense.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {expenses.length === 0 && <p className="no-expenses">No expenses to display.</p>}
    </div>
  );
}

export default ExpenseTable;