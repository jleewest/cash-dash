import { Doughnut } from 'react-chartjs-2';
import { Transaction } from '../../transaction';
import { sortedCategories } from './ChartUtil';

type DoughnutChartProps = {
  transactionsByYear: Transaction[];
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
