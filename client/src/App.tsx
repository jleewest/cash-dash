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
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        const sortedTransactions: Transaction[] = data
          .map((transaction: Transaction) => ({
            ...transaction,
            // DB stores amount in cents
            amount: transaction.amount / 100,
          }))
          // Sort transactions by date
          .sort((a: Record<string, string>, b: Record<string, string>) => {
            new Date(b.date).getTime() - new Date(a.date).getTime();
          });
        setTransactions(sortedTransactions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
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
