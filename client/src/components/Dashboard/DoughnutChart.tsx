import { Doughnut } from 'react-chartjs-2';
import { Transaction } from '../../transaction';

type DoughnutChartProps = {
  transactionsByYear: Transaction[];
};

// Group transactions by category and calculate total expenses
export const groupedTransactions = (transactionsByYear: Transaction[]) => {
  return transactionsByYear.reduce(
    (acc, transaction) => {
      if (transaction.type === 'expense') {
        acc[transaction.category] =
          (acc[transaction.category] || 0) + Math.abs(transaction.amount);
      }
      return acc;
    },
    {} as Record<string, number>
  );
};

// Sort categories by total expenses
export const sortedCategories = (transactionsByYear: Transaction[]) => {
  return Object.entries(groupedTransactions(transactionsByYear)).sort(
    (a, b) => b[1] - a[1]
  );
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  transactionsByYear,
}) => {
  // Get top 5 categories
  const top5Categories = sortedCategories(transactionsByYear).slice(0, 5);

  return (
    <Doughnut
      data-testid='doughnut-chart'
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
