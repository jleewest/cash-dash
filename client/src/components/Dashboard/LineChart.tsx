import { Line } from 'react-chartjs-2';
import {
  groupByMonth,
  getSortedMonths,
  incomeTransactions,
  expenseTransactions,
} from './ChartUtil';
import { Transaction } from '../../transaction';

type LineChartProps = {
  transactionsByYear: Transaction[];
};

const LineChart: React.FC<LineChartProps> = ({ transactionsByYear }) => {
  // Group transactions by month and calculate total income and expenses
  const incomeGrouped = groupByMonth(incomeTransactions(transactionsByYear));
  const expensesGrouped = groupByMonth(expenseTransactions(transactionsByYear));

  // Get all unique months from income and expenses transactions, and sort them
  const sortedMonths = getSortedMonths(incomeGrouped, expensesGrouped);

  // Create labels and data for income and expenses
  const labels = sortedMonths.map((month) =>
    new Date(2023, month).toLocaleString('default', { month: 'short' })
  );

  const balanceData = sortedMonths.map(
    (month) => (incomeGrouped[month] || 0) - (expensesGrouped[month] || 0)
  );

  return (
    <Line
      data-testid='line-chart'
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
