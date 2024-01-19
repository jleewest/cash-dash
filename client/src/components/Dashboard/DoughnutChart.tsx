import { Doughnut } from 'react-chartjs-2';
import { Transaction } from './ChartUtil';

// Todo: put all transaction filtering logic in separate file
type DoughnutChartProps = {
  transactionsByYear: Transaction[];
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  transactionsByYear,
}) => {
  // Group transactions by category and calculate total expenses
  const groupedTransactions = transactionsByYear.reduce(
    (acc, transaction) => {
      if (transaction.type === 'expense') {
        acc[transaction.category] =
          (acc[transaction.category] || 0) + Math.abs(transaction.amount);
      }
      return acc;
    },
    {} as Record<string, number>
  );

  // Sort categories by total expenses
  const sortedCategories = Object.entries(groupedTransactions).sort(
    (a, b) => b[1] - a[1]
  );

  // Get top 5 categories
  const top5Categories = sortedCategories.slice(0, 5);

  return (
    <Doughnut
      data={{
        // Labels
        labels: top5Categories.map((transaction) => transaction[0]),
        datasets: [
          {
            label: 'Expenses',
            // Data
            data: top5Categories.map((transaction) => transaction[1]),
            backgroundColor: [
              '#ff4069',
              '#ff9e40',
              '#ffcd56',
              '#23cfce',
              '#049bff',
            ],
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          title: {
            text: 'Top 5 Expense Categories',
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
