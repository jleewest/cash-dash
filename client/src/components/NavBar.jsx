import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTableList } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@chakra-ui/react';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import user from '../assets/user.jpg';

// Display navigation bar and user details at the bottom
const NavBar = () => {
  return (
    <>
    {/* Nav bar */}
      <div className="navbar">
        <nav>
          <ul>
            <li>
              <Link to={`/`} className="link">
                <FontAwesomeIcon icon={faHouse} className="icon" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={`/transactions`} className="link">
                <FontAwesomeIcon icon={faTableList} className="icon" />
                Transactions
              </Link>
            </li>
          </ul>
        </nav>
        {/* User details */}
        <div className="user">
          <Avatar
            name="John Doe"
            src={user}
            size="lg"
            boxShadow={'0 0 10px rgba(0, 0, 0, 0.5)'}
          />
          <div className="user-details">
            <h3>John Doe</h3>
            <p>john.doe@cashdash.com</p>
          </div>
          <div className="signout">
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="icon" />
            Sign out
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
