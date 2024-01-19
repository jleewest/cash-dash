import { Line } from 'react-chartjs-2';

// Todo: put all transaction filtering logic in separate file
type LineChartProps = {
  transactionsByYear: Transaction[];
};

type Transaction = {
  amount: number;
  category: string;
  date: string;
  id: number;
  note: string;
  type: string;
};

//@ts-ignore
const LineChart = ({ transactionsByYear }) => {
  // Split transactions into income and expenses
  const incomeTransactions = transactionsByYear.filter(
    (transaction: Transaction) => transaction.type === 'income'
  );
  const expensesTransactions = transactionsByYear.filter(
    (transaction: Transaction) => transaction.type === 'expense'
  );

  // Group transactions by month and calculate total income and expenses
  const groupByMonth = (transactions: Transaction[]) => {
    //@ts-ignore
    return transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).getMonth();
      //@ts-ignore
      if (!acc[month]) acc[month] = 0;
      // Use absolute value of amount
      //@ts-ignore
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
    //@ts-ignore
  ].sort((a, b) => a - b);

  // Create labels and data for income and expenses
  const labels = sortedMonths.map((month) =>
    //@ts-ignore
    new Date(2023, month).toLocaleString('default', { month: 'short' })
  );
  const balanceData = sortedMonths.map(
    //@ts-ignore
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
