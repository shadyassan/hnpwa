import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo';

const TopBar = () => {
  return (
    <div className="topBar">
      <Logo />
      <ul className="navigation">
        <li>
          <NavLink exact to="/" activeClassName="selected">
            News
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/newest" activeClassName="selected">
            Newest
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default memo(TopBar);
