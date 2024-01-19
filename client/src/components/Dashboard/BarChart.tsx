import { Bar } from 'react-chartjs-2';
import { Transaction, groupByMonth, getSortedMonths } from './ChartUtil';

// Todo: put all transaction filtering logic in separate file

type BarChartProps = {
  transactionsByYear: Transaction[];
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
  const incomeGrouped = groupByMonth(incomeTransactions);
  const expensesGrouped = groupByMonth(expensesTransactions);

  // Get all unique months from income and expenses transactions, and sort them
  const sortedMonths = getSortedMonths(incomeGrouped, expensesGrouped);

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
