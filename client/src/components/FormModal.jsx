import { useEffect, useState, useContext } from 'react';
import { TransactionsContext } from '../App.jsx';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Switch,
  useToast,
} from '@chakra-ui/react';

// Todo: clicking outside of modal doesn't empty form fields
// Todo: move all api calls to separate file
// Todo: ability to add, edit, remove categories

function FormModal({ isOpen, onClose, selectedTransaction }) {
  // Context
  const { setTransactions } = useContext(TransactionsContext);
  // States
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isExpense, setIsExpense] = useState(true);

  const toast = useToast();

  // For setting form's default date to today's date
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  // Set form fields to selected transaction's values (if editing)
  useEffect(() => {
    if (selectedTransaction) {
      setDate(selectedTransaction.date || '');
      setCategory(selectedTransaction.category || '');
      setAmount(selectedTransaction.amount || '');
      setNote(selectedTransaction.note || '');
      setIsExpense(selectedTransaction.type === 'expense');
    } else {
      setDate(formattedDate);
      setCategory('');
      setAmount('');
      setNote('');
    }
  }, [selectedTransaction]);

  // Form field change handling
  function handleDateChange(e) {
    setDate(e.target.value);
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  function handleAmountChange(e) {
    const amount = e.target.value;
    setAmount(amount);
  }

  function handleNoteChange(e) {
    setNote(e.target.value);
  }

  // Form submission handling
  async function handleSubmit(e) {
    e.preventDefault();
    console.log('date', date);
    const amountNumber = Number(amount);

    // Form validation
    if (!date || !category) {
      toast({
        title: 'Fill out all required fields',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    } else if (isNaN(amountNumber) || amountNumber === 0) {
      toast({
        title: 'Amount must be a number other than 0',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }

    const transactionData = {
      date: date,
      category: category,
      amount: Math.round(amountNumber * 100),
      note: note,
      type: isExpense ? 'expense' : 'income',
    };

    // Update transaction or create new transaction in database
    let response;
    if (selectedTransaction) {
      response = await fetch(
        `http://localhost:3000/transactions/${selectedTransaction.id}`,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transactionData),
        }
      );
    } else {
      response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
    }

    // Update transactions state
    const updatedTransaction = await response.json();
    updatedTransaction.amount = updatedTransaction.amount / 100;
    setTransactions((oldTransactions) => {
      if (selectedTransaction) {
        return oldTransactions.map((transaction) =>
          transaction.id === selectedTransaction.id
            ? updatedTransaction
            : transaction
        );
      } else {
        return [...oldTransactions, updatedTransaction];
      }
    });
    // Reset fields
    setDate('');
    setCategory('');
    setAmount('');
    setNote('');
    toast({
      title: 'Transaction saved',
      status: 'success',
      isClosable: true,
      position: 'top',
    });
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent borderRadius={16}>
          <ModalHeader>
            {selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl onSubmit={handleSubmit}>
              {/* Expense vs. Income switch */}
              <FormControl display="flex" justifyContent="center">
                <FormLabel htmlFor="type" mb="0">
                  Expense
                </FormLabel>
                <Switch
                  id="type"
                  colorScheme="green"
                  onChange={() => setIsExpense(!isExpense)}
                  isChecked={!isExpense}
                />
                <FormLabel htmlFor="type" mx="3">
                  Income
                </FormLabel>
              </FormControl>

              {/* Date picker */}
              <FormControl isRequired>
                <FormLabel htmlFor="date">Date:</FormLabel>
                <Input
                  type="date"
                  id="date"
                  value={date}
                  onChange={handleDateChange}
                  name="date"
                  mb="6"
                  borderRadius={16}
                />
              </FormControl>

              {/* Category Selection */}
              <FormControl isRequired>
                <FormLabel htmlFor="category">Category:</FormLabel>
                <Select
                  type="text"
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  name="category"
                  placeholder="Select category"
                  mb="6"
                  borderRadius={16}
                >
                  {/* Show different categories based on switch */}
                  {isExpense ? (
                    <>
                      <option value="Bills">Bills</option>
                      <option value="Food">Food</option>
                      <option value="Housing">Housing</option>
                      <option value="Insurance">Insurance</option>
                      <option value="Pets">Pets</option>
                      <option value="Phone&Internet">Food</option>
                      <option value="Subscriptions">Subscriptions</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Other">Other</option>
                    </>
                  ) : (
                    <>
                      <option value="Freelancing">Freelancing</option>
                      <option value="Rental Income">Dividend Income</option>
                      <option value="Salary">Salary</option>
                      <option value="Sale">Sale</option>
                    </>
                  )}
                </Select>
              </FormControl>

              {/* Amount input */}
              <FormControl isRequired>
                <FormLabel htmlFor="amount">Amount:</FormLabel>
                <Input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  name="amount"
                  mb="6"
                  className={isExpense ? 'red' : 'green'}
                  borderRadius={16}
                />
              </FormControl>

              {/* Note input */}
              <FormLabel htmlFor="note">Note:</FormLabel>
              <Input
                type="text"
                id="note"
                value={note}
                onChange={handleNoteChange}
                name="note"
                mb="6"
                borderRadius={16}
              />
            </FormControl>
          </ModalBody>

          {/* Cancel button */}
          <ModalFooter>
            <Button
              mr={3}
              onClick={onClose}
              borderRadius={16}
              bg="#00000095"
              color={'white'}
              _hover={{
                backgroundColor: '#00000025',
                color: '#00000095',
              }}
            >
              Cancel
            </Button>

            {/* Save transaction button */}
            <Button
              type="submit"
              bg="#0902ff90"
              _hover={{
                backgroundColor: '#0902ff30',
                color: '#0902ff90',
              }}
              borderRadius={16}
              color={'white'}
              onClick={(e) => handleSubmit(e)}
            >
              Save Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FormModal;
