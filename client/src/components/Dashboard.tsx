import { useState } from 'react';
import Chart from 'chart.js/auto';
import './Dashboard.css';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
} from '@chakra-ui/react';
import BarChart from './Dashboard/BarChart.tsx';
import DoughnutChart from './Dashboard/DoughnutChart.tsx';
import LineChart from './Dashboard/LineChart.tsx';
import { Flex, Select } from '@chakra-ui/react';
import DashboardRecentTransactions from './DashboardRecentTransactions.tsx';
import { useTransactionContext } from '../transaction.tsx';

Chart.defaults.responsive = true;
Chart.defaults.plugins.title.display = true;
//@ts-expect-error
Chart.defaults.plugins.title.font.size = 20;
Chart.defaults.plugins.title.color = 'black';

// TODO: logic for total balance to deduct expenses
// Todo: logic for when there are no transactions
// Todo: make Stats as external component
// Todo: StatHelpText has no logic yet
// Todo: refactor styling
// Todo: duplicated StateNumber logic
// Todo: duplicated date

const Dashboard = () => {
  // Context
  const { transactions } = useTransactionContext();
  // State
  const [selectedYear, setSelectedYear] = useState('2024');
  // Filter transactions by year to pass to charts
  const transactionsByYear = transactions.filter(
    (transaction) =>
      new Date(transaction.date).getFullYear().toString() === selectedYear
  );

  const totalIncome = transactionsByYear
    .filter((transaction) => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);

  const totalExpenses = transactionsByYear
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);

  const totalBalance = (totalIncome: number, totalExpenses: number) => {
    return (totalIncome - totalExpenses).toFixed(2);
  };

  return (
    <div data-testid='dashboard-container'>
      {/* Header: date and year selection */}
      <Flex mb={2} justifyContent='space-between' align='center'>
        {/* Date */}
        <Text
          fontSize='2xl'
          fontWeight={700}
          mb={2}
          background='none'
          color='#0902ff80'
        >
          {new Date().toLocaleString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </Text>
        {/* Year selection */}
        <Select
          data-testid='set-year-button'
          defaultValue='2024'
          w={90}
          onChange={(e) => setSelectedYear(e.target.value)}
          bg='#0902ff90'
          border={'none'}
          fontWeight={700}
          color='white'
          borderRadius={16}
          _hover={{ bg: '#ffffff70', color: '#0902ff90' }}
        >
          <option value='2024'>2024</option>
          <option value='2023'>2023</option>
        </Select>
      </Flex>

      <div className='dashboard'>
        {/* Total balance card */}
        <Stat className='stat'>
          <StatLabel>Total Balance</StatLabel>
          <StatNumber>
            {totalBalance(Number(totalIncome), Number(totalExpenses))}€
          </StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat className='stat'>
          {/* Total income card */}
          <StatLabel>Total Income</StatLabel>
          <StatNumber>{totalIncome}</StatNumber>
          <StatHelpText>
            <StatArrow type='decrease' />
            9.05%
          </StatHelpText>
        </Stat>

        <Stat className='stat'>
          {/* Total expenses card */}
          <StatLabel>Total Expenses</StatLabel>
          <StatNumber>{totalExpenses}</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            5.87%
          </StatHelpText>
        </Stat>

        {/* Charts: pass transactions based on selected year*/}
        <div className='doughnut-chart'>
          <DoughnutChart transactionsByYear={transactionsByYear} />
        </div>
        <div className='bar-chart'>
          <BarChart transactionsByYear={transactionsByYear} />
        </div>
        <div className='line-chart'>
          <LineChart transactionsByYear={transactionsByYear} />
        </div>
        <div className='recent-transactions'>
          <DashboardRecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
