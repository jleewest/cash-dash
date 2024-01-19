import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import { useTransactionContext } from '../transaction.tsx';
import moment from 'moment';

// Shows the 6 most recent transactions in a table
const DashboardRecentTransactions = () => {
  const { transactions } = useTransactionContext();

  return (
    <TableContainer>
      <Table variant='striped' colorScheme='gray' size='sm' className='table'>
        <caption>Recent Transactions</caption>
        <Thead>
          <Tr>
            <Th fontWeight={900}>Date</Th>
            <Th fontWeight={900}>Category</Th>
            <Th fontWeight={900}>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.slice(0, 6).map((transaction) => (
            <Tr key={transaction.id}>
              <Td>{moment(transaction.date).format('DD.MM.YY')}</Td>
              <Td>{transaction.category}</Td>
              <Td textAlign={'right'}>
                <Tag
                  size='md'
                  borderRadius='full'
                  variant='subtle'
                  color='white'
                  bg={transaction.type === 'expense' ? '#ff4069' : '#40cfa6'}
                >
                  <TagLabel>{transaction.amount}€</TagLabel>
                </Tag>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DashboardRecentTransactions;
