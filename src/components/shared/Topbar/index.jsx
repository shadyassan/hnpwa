import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import stl from './Topbar.module.scss';

const TopBar = () => {
  return (
    <div className={stl.topBar}>
      <Link to="/">
        <img src={logo} alt="#" className={stl.logImg} />
      </Link>
      <ul className={stl.navigation}>
        <li>
          <NavLink exact to="/" activeClassName={stl.selected}>
            News
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/newest" activeClassName={stl.selected}>
            Newest
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default TopBar;
