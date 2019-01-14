import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => (
  <header className="page-header">
    <Link className="page-header-logo" role="Link" title="My Todos" to="/">
      <div className="page-header-logo-text">MyTodos</div>
    </Link>
  </header>
);

export default Header;
