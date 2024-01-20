import React from 'react';
import { useEffect, useState } from 'react';
import { useTransactionContext, Transaction } from '../transaction';
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
import { changeTransaction, postTransaction } from '../apiServices';

// Todo: clicking outside of modal doesn't empty form fields
// Todo: ability to add, edit, remove categories

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTransaction: Transaction | null;
}

function FormModal({ isOpen, onClose, selectedTransaction }: FormModalProps) {
  // Context
  const { setTransactions } = useTransactionContext();
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
      setAmount(selectedTransaction.amount.toString() || '');
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
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    switch (name) {
      case 'date':
        setDate(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'amount':
        setAmount(value);
        break;
      case 'note':
        setNote(value);
        break;
      default:
        break;
    }
  }

  // Form submission handling
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
      response = await changeTransaction(
        transactionData,
        selectedTransaction.id
      );
    } else {
      response = await postTransaction(transactionData);
    }

    // Update transactions state
    const updatedTransaction = await response;
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
      <Modal isOpen={isOpen} onClose={onClose} size='xl' id='modal'>
        <ModalOverlay />
        <ModalContent borderRadius={16}>
          <ModalHeader>
            {selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            {' '}
            {/* Form element with onSubmit handler */}
            <ModalBody>
              {/* Expense vs. Income switch */}
              <FormControl display='flex' justifyContent='center'>
                <FormLabel htmlFor='type' mb='0'>
                  Expense
                </FormLabel>
                <Switch
                  id='type'
                  colorScheme='green'
                  onChange={() => setIsExpense(!isExpense)}
                  isChecked={!isExpense}
                />
                <FormLabel htmlFor='type' mx='3'>
                  Income
                </FormLabel>
              </FormControl>

              {/* Date picker */}
              <FormControl isRequired>
                <FormLabel htmlFor='date'>Date:</FormLabel>
                <Input
                  type='date'
                  id='date'
                  value={date}
                  onChange={handleInputChange}
                  name='date'
                  mb='6'
                  borderRadius={16}
                />
              </FormControl>

              {/* Category Selection */}
              <FormControl isRequired>
                <FormLabel htmlFor='category'>Category:</FormLabel>
                <Select
                  id='category'
                  value={category}
                  onChange={handleInputChange}
                  name='category'
                  placeholder='Select category'
                  mb='6'
                  borderRadius={16}
                >
                  {/* Show different categories based on switch */}
                  {isExpense ? (
                    <>
                      <option value='Bills'>Bills</option>
                      <option value='Food'>Food</option>
                      <option value='Housing'>Housing</option>
                      <option value='Insurance'>Insurance</option>
                      <option value='Pets'>Pets</option>
                      <option value='Phone&Internet'>Phone&Internet</option>
                      <option value='Subscriptions'>Subscriptions</option>
                      <option value='Transportation'>Transportation</option>
                      <option value='Utilities'>Utilities</option>
                      <option value='Other'>Other</option>
                    </>
                  ) : (
                    <>
                      <option value='Freelancing'>Freelancing</option>
                      <option value='Rental Income'>Rental Income</option>
                      <option value='Salary'>Salary</option>
                      <option value='Sale'>Sale</option>
                    </>
                  )}
                </Select>
              </FormControl>

              {/* Amount input */}
              <FormControl isRequired>
                <FormLabel htmlFor='amount'>Amount:</FormLabel>
                <Input
                  type='number'
                  id='amount'
                  value={amount}
                  onChange={handleInputChange}
                  name='amount'
                  mb='6'
                  borderRadius={16}
                />
              </FormControl>

              {/* Note input */}
              <FormLabel htmlFor='note'>Note:</FormLabel>
              <Input
                type='text'
                id='note'
                value={note}
                onChange={handleInputChange}
                name='note'
                mb='6'
                borderRadius={16}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                mr={3}
                onClick={onClose}
                borderRadius={16}
                bg='#00000095'
                color={'white'}
                _hover={{
                  backgroundColor: '#00000025',
                  color: '#00000095',
                }}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                bg='#0902ff90'
                _hover={{
                  backgroundColor: '#0902ff30',
                  color: '#0902ff90',
                }}
                borderRadius={16}
                color={'white'}
              >
                Save Transaction
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FormModal;
