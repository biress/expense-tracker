import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Lunch', description: 'Groceries for lunch', amount: 45, category: 'Food', date: '2025-04-02' },
    { id: 2, name: 'Taxi', description: 'Ride to the office', amount: 20, category: 'Transport', date: '2025-04-03' },
    { id: 3, name: 'Movie Ticket', description: 'Evening show', amount: 12, category: 'Entertainment', date: '2025-04-05' },
    { id: 4, name: 'Coffee', description: 'Morning coffee at the cafe', amount: 5, category: 'Food', date: '2025-04-08' },
    { id: 5, name: 'Book', description: 'New novel', amount: 15, category: 'Entertainment', date: '2025-04-10' },
  ]);

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(''); 

  const handleAddExpense = (expense) => {
    const newExpense = { ...expense, id: Date.now() };
    setExpenses([...expenses, newExpense]);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
    if (confirmDelete) {
      setExpenses(expenses.filter(exp => exp.id !== id));
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    } else if (sortBy === 'description') {
      return a.description.localeCompare(b.description);
    }
    return 0;
  });

  const filteredExpenses = sortedExpenses.filter(expense =>
    expense.name.toLowerCase().includes(search.toLowerCase()) ||
    expense.description.toLowerCase().includes(search.toLowerCase()) ||
    expense.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="app-header">Expense Tracker</h1>
      <p className="app-subheader">Start taking control of your finances and life, record, categorize and analyze your spending.</p>
      <div className="app-content">
        <div className="form-area">
          <div className="form-container">
            <h2 className="form-title">Add Expense</h2>
            <ExpenseForm onAddExpense={handleAddExpense} />
          </div>
        </div>
        <div className="right-area">
          <div className="sort-options">
            <label className="sort-label" htmlFor="sort-dropdown">Sort by:</label>
            <select
              id="sort-dropdown"
              className="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">None</option>
              <option value="category">Category</option>
              <option value="description">Description</option>
            </select>
          </div>
          <SearchBar search={search} setSearch={setSearch} />
          <ExpenseTable expenses={filteredExpenses} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;

