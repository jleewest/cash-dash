import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar.tsx';
import Transactions from './components/Transactions.tsx';
import Header from './components/Header.tsx';
import Dashboard from './components/Dashboard.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TransactionsContext } from './transaction.tsx';
import { getTransactions } from './apiServices.tsx';
export { TransactionsContext };

// Todo: API requests all in separate file
// Todo: implement error catching for all APIs

// TransactionsContext is used to pass transactions throughout the app
function App() {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from server
  useEffect(() => {
    getTransactions().then((data) => {
      const sortedTransactions = data
        //@ts-ignore
        .map((transaction) => ({
          ...transaction,
          // DB stores amount in cents
          amount: transaction.amount / 100,
        }))
        // Sort transactions by date
        //@ts-ignore
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
