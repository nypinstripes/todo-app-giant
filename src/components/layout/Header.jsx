import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => (
  <header className="page-header">
    <div className="page-header-container">
      <Link className="page-header-logo" role="Link" tabIndex="1" title="My Todos" to="/">
        <div className="page-header-logo-text">MyTodos</div>
      </Link>
    </div>
  </header>
);

export default Header;
