import { Bar } from 'react-chartjs-2';

// Todo: put all transaction filtering logic in separate file

type BarChartProps = {
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

const BarChart: React.FC<BarChartProps> = ({ transactionsByYear }) => {
  // Split transactions into income and expenses
  const incomeTransactions = transactionsByYear.filter(
    (transaction) => transaction.type === 'income'
  );
  const expensesTransactions = transactionsByYear.filter(
    (transaction) => transaction.type === 'expense'
  );

  // Group transactions by month and calculate total income and expenses
  const groupByMonth = (transactions: Transaction[]) => {
    return transactions.reduce(
      (acc, transaction) => {
        const month = new Date(transaction.date).getMonth();
        if (!acc[month]) acc[month] = 0;
        // Use absolute value of amount
        acc[month] += Math.abs(transaction.amount);
        return acc;
      },
      {} as Record<number, number>
    );
  };

  const incomeGrouped = groupByMonth(incomeTransactions);
  const expensesGrouped = groupByMonth(expensesTransactions);

  // Get all unique months from income and expenses transactions, and sort them
  const sortedMonths = [
    ...new Set([
      ...Object.keys(incomeGrouped).map(Number),
      ...Object.keys(expensesGrouped).map(Number),
    ]),
  ].sort((a, b) => a - b);

  // Create labels and data for income and expenses
  const labels = sortedMonths.map((month) =>
    new Date(2023, month).toLocaleString('default', { month: 'short' })
  );
  const incomeData = sortedMonths.map((month) => incomeGrouped[month] || 0);
  const expensesData = sortedMonths.map((month) => expensesGrouped[month] || 0);

  return (
    <Bar
      data={{
        labels,
        // Data
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            backgroundColor: '#40cfa6',
          },
          {
            label: 'Expenses',
            data: expensesData,
            backgroundColor: '#ff4069',
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
            text: 'Income vs. Expenses',
          },
        },
      }}
    />
  );
};

export default BarChart;
