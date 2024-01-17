import { Line } from 'react-chartjs-2';

// Todo: put all transaction filtering logic in separate file

const LineChart = ({ transactionsByYear }) => {
  // Split transactions into income and expenses
  const incomeTransactions = transactionsByYear.filter(
    (transaction) => transaction.type === 'income'
  );
  const expensesTransactions = transactionsByYear.filter(
    (transaction) => transaction.type === 'expense'
  );

  // Group transactions by month and calculate total income and expenses
  const groupByMonth = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).getMonth();
      if (!acc[month]) acc[month] = 0;
      // Use absolute value of amount
      acc[month] += Math.abs(transaction.amount);
      return acc;
    }, {});
  };

  const incomeGrouped = groupByMonth(incomeTransactions);
  const expensesGrouped = groupByMonth(expensesTransactions);

  // Get all unique months from income and expenses transactions, and sort them
  const sortedMonths = [
    ...new Set([
      ...Object.keys(incomeGrouped),
      ...Object.keys(expensesGrouped),
    ]),
  ].sort((a, b) => a - b);

  // Create labels and data for income and expenses
  const labels = sortedMonths.map((month) =>
    new Date(2023, month).toLocaleString('default', { month: 'short' })
  );
  const balanceData = sortedMonths.map(
    (month) => (incomeGrouped[month] || 0) - (expensesGrouped[month] || 0)
  );

  return (
    <Line
      data={{
        labels,
        // Data
        datasets: [
          {
            label: 'Balance',
            data: balanceData,
            backgroundColor: '#049bff',
            borderColor: '#049bff',
            fill: false,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.5,
          },
        },
        plugins: {
          title: {
            text: 'Monthly Cash Flow',
          },
        },
      }}
    />
  );
};

export default LineChart;
