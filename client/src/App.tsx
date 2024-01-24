import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar.tsx';
import Transactions from './components/Transactions.tsx';
import Header from './components/Header.tsx';
import Dashboard from './components/Dashboard.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Transaction, TransactionsContext } from './transaction.tsx';
import { getTransactions } from './apiServices.tsx';

// TransactionsContext is used to pass transactions throughout the app
function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Fetch transactions from server
  useEffect(() => {
    const fetchTransactions = async (): Promise<void> => {
      try {
        const data = await getTransactions();
        const sortedTransactions: Transaction[] = data
          .map((transaction) => ({
            ...transaction,
            // DB stores amount in cents
            amount: transaction.amount / 100,
          }))
          // Sort transactions by date
          .sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
        setTransactions((prevTransactions) => {
          if (
            JSON.stringify(prevTransactions) !==
            JSON.stringify(sortedTransactions)
          ) {
            return sortedTransactions;
          }
          return prevTransactions;
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <Router>
      <div className='app'>
        <div className='header-navbar-container'>
          <Header />
          <NavBar />
        </div>
        <div className='main' role='main'>
          <TransactionsContext.Provider
            value={{ transactions, setTransactions }}
          >
            <Routes>
              <Route
                path='/'
                element={
                  <div>
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
