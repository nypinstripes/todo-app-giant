import { string } from 'prop-types';
import ListActions from './ListActions';
import ListInfo from './ListInfo';
import React from 'react';

const ListHead = props => (
  <div className="list-head">
    <ListInfo />
    <ListActions />
  </div>
);

ListHead.propTypes = {
  name: string,
  type: string
};

export default ListHead;
