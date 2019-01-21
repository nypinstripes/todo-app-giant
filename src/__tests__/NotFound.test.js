import React from 'react';
import { create } from 'react-test-renderer';
import NotFound from '../components/tools/NotFound';

test('snapshot', () => {
  const notFoundComponent = create(<NotFound />);

  expect(notFoundComponent.toJSON()).toMatchSnapshot();
});
