import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="logo" className={'logImg'} />
    </Link>
  );
};

export default Logo;
