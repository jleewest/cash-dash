const Transactions = ({ transactions }) => {
  return (
    <div>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.date} {transaction.amount}€ {transaction.note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
