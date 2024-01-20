import logo from '../assets/logo.png';
import { Heading, Highlight } from '@chakra-ui/react';
import './Header.css';

// Display Logo and App Name
const Header = () => {
  return (
    <header>
      {/* Logo */}
      <div>
        <img src={logo} alt='logo' width={160} className='logo' />
      </div>
      {/* App name */}
      <Heading as='h1' lineHeight='tall' mt={2} size='xl'>
        <Highlight
          query='Cash'
          styles={{
            px: '2',
            py: '1',
            rounded: 'full',
            bg: 'red.100',
          }}
        >
          CashDash
        </Highlight>
      </Heading>
    </header>
  );
};

export default Header;
