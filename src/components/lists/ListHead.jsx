import { string } from 'prop-types';
import ListActions from './ListActions';
import ListInfo from './ListInfo';
import React from 'react';

const ListHead = props => (
  <div className="list-head">
    <ListInfo type={props.type} />
    <ListActions />
  </div>
);

ListHead.propTypes = {
  type: string
};

export default ListHead;
