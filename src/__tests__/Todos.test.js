import { create } from 'react-test-renderer';
import App from '../components/App';
import Todos from '../components/todos/Todos';
import React from 'react';
import ServerRouter, { withRouter } from 'react-router-dom';

test('snapshot', () => {
  const favoritesComponent = create(withRouter(<Todos />));

  expect(favoritesComponent.toJSON()).toMatchSnapshot();
});
