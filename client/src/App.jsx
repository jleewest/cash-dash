import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar.jsx';
import Transactions from './components/Transactions.tsx';
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Todo: API requests all in separate file
// Todo: implement error catching for all APIs

// TransactionsContext is used to pass transactions throughout the app
export const TransactionsContext = React.createContext();

function App() {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from server
  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then((res) => res.json())
      .then((data) => {
        const sortedTransactions = data
          .map((transaction) => ({
            ...transaction,
            // DB stores amount in cents
            amount: transaction.amount / 100,
          }))
          // Sort transactions by date
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(sortedTransactions);
      });
  }, [transactions]); // Causes infinite loop, remove dependency, but then transactions don't update when modyfing them

  return (
    <Router>
      <div className='app'>
        <div className='header-navbar-container'>
          <Header />
          <NavBar />
        </div>
        <div className='main'>
          <TransactionsContext.Provider
            value={{ transactions, setTransactions }}
          >
            <Routes>
              <Route
                path='/'
                element={
                  <div className='dashboard-container'>
                    <Dashboard />
                  </div>
                }
              />
              <Route
                path='/transactions'
                element={
                  <div className='transactions-container'>
                    <Transactions />
                  </div>
                }
              />
            </Routes>
          </TransactionsContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
