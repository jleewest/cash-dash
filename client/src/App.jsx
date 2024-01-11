import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar.jsx';
import Transactions from './components/Transactions.jsx';
import Header from './components/Header.jsx';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <div id="app">
      <Header />
      <NavBar />
      <Transactions transactions={transactions} />
    </div>
  );
}

export default App;
