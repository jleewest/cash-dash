import { useContext, useEffect, useState } from 'react';
import FormModal from './FormModal.tsx';
import { TransactionsContext } from '../App.tsx';
import {
  Button,
  Table,
  TableContainer,
  Thead,
  Td,
  Tr,
  Th,
  Tbody,
  Tab,
  Tabs,
  TabList,
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Flex,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPenToSquare,
  faPlus,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

// Todo: duplicated Date here and in Dashboard.jsx
// Todo: duplicated Table here and in DashboardRecentTransactions.jsx
// Todo: refactor styling

const Transactions = () => {
  // Context
  //@ts-ignore
  const { transactions } = useContext(TransactionsContext);

  // States
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedTab, setSelectedTab] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toast = useToast();

  // Filter transactions by tab and search term
  useEffect(() => {
    let result = transactions;
    if (selectedTab === 'Expenses') {
      //@ts-ignore
      result = result.filter((transaction) => transaction.type === 'expense');
    } else if (selectedTab === 'Income') {
      //@ts-ignore
      result = result.filter((transaction) => transaction.type === 'income');
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    result = result.filter(
      //@ts-ignore
      (transaction) =>
        (transaction.date &&
          transaction.date
            .toString()
            .toLowerCase()
            .includes(lowerCaseSearchTerm)) ||
        (transaction.category &&
          transaction.category.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (transaction.amount &&
          transaction.amount.toString().includes(lowerCaseSearchTerm)) ||
        (transaction.note &&
          transaction.note.toLowerCase().includes(lowerCaseSearchTerm))
    );

    setFilteredTransactions(result);
  }, [selectedTab, transactions, searchTerm]);

  // Remove transaction
  //@ts-ignore
  async function handleRemove(transactionId) {
    await fetch(`http://localhost:3000/transactions/${transactionId}`, {
      method: 'DELETE',
      mode: 'cors',
    });
    toast({
      title: 'Transaction deleted',
      status: 'success',
      isClosable: true,
      position: 'top',
    });
  }

  //@ts-ignore
  function openModal(transaction) {
    setSelectedTransaction(transaction);
    setShowModal(true);
  }

  function closeModal() {
    setSelectedTransaction(null);
    setShowModal(false);
  }

  //@ts-ignore
  function handleTabClick(tab) {
    setSelectedTab(tab);
  }

  //@ts-ignore
  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    //@ts-ignore
    <>
      {/* FormModal component opens with either selected transactions or none */}
      <FormModal
        isOpen={showModal}
        onClose={closeModal}
        selectedTransaction={selectedTransaction}
      />

      {/* Header with date */}
      <Flex justifyContent='flex-start' width='fit-content' background='none'>
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
      </Flex>

      {/* Tabs: All, Expenses, Income */}
      <Tabs variant='solid-rounded' colorScheme='gray' isFitted p={2}>
        <TabList>
          <Tab onClick={() => handleTabClick('All')}>All</Tab>
          <Tab onClick={() => handleTabClick('Expenses')}>Expenses</Tab>
          <Tab onClick={() => handleTabClick('Income')}>Income</Tab>

          {/* Search bar */}
          <InputGroup mx={20} w={300} borderRadius={16}>
            <Input
              type='text'
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder='Search transactions...'
              _placeholder={{ color: '#00000080' }}
              borderRadius={16}
              borderColor='#0902ff30'
              _hover={{ borderColor: '#0902ff90' }}
            />
            <InputLeftElement>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </InputLeftElement>
          </InputGroup>

          {/* Add transaction button */}
          <Button
            onClick={() => openModal(null)}
            bg='#0902ff90'
            borderRadius={16}
            color={'white'}
            _hover={{
              backgroundColor: '#0902ff30',
              color: '#0902ff90',
            }}
          >
            <FontAwesomeIcon className='icon white' icon={faPlus} />
            Add Transaction
          </Button>
        </TabList>
      </Tabs>

      {/* Table with transactions */}
      <div className='table-container'>
        <TableContainer mt={4}>
          <Table
            variant='striped'
            colorScheme='gray'
            size='lg'
            className='table'
          >
            <Thead>
              <Tr>
                <Th fontWeight={900}>Date</Th>
                <Th fontWeight={900}>Category</Th>
                <Th fontWeight={900}>Amount</Th>
                <Th></Th>
                <Th fontWeight={900}>Note</Th>
                <Th fontWeight={900}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Filtered by tab and search term */}
              {filteredTransactions.map((transaction) => (
                <Tr key={transaction.id}>
                  <Td>{moment(transaction.date).format('DD.MM.YYYY')}</Td>
                  <Td>{transaction.category}</Td>
                  <Td textAlign={'right'}>
                    <Tag
                      size='lg'
                      borderRadius='full'
                      variant='subtle'
                      className='tag'
                      color='white'
                      bg={
                        transaction.type === 'expense' ? '#ff4069' : '#40cfa6'
                      }
                    >
                      <TagLabel>{transaction.amount}€</TagLabel>
                    </Tag>
                  </Td>
                  <Td></Td>
                  <Td>{transaction.note}</Td>
                  <Td>
                    {/* Edit and delete buttons */}
                    <button onClick={() => openModal(transaction)}>
                      <FontAwesomeIcon icon={faPenToSquare} className='icon' />
                    </button>
                    <button onClick={() => handleRemove(transaction.id)}>
                      <FontAwesomeIcon icon={faTrash} className='icon' />
                    </button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Transactions;
