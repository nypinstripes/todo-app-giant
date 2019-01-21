import { create } from 'react-test-renderer';
import App from '../components/App';
import NavBar from '../components/layout/NavBar';
import React from 'react';
import ServerRouter, { Link, withRouter } from 'react-router-dom';

test('snapshot', () => {
  const navBarComponent = create(withRouter(<NavBar />));

  expect(navBarComponent.toJSON()).toMatchSnapshot();
});
