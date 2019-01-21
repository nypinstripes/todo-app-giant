import { array, func, object, string, number } from 'prop-types';
import Empty from '../tools/Empty';
import React, { Component } from 'react';

class List extends Component {
  static propTypes = {
    emptyType: object,
    ListItem: func,
    listItems: array,
    type: string,
    winW: number
  }

  getListItems = () => {
    const { emptyType, ListItem, listItems, type, winW } = this.props;

    if (listItems.length === 0) return <Empty emptyType={emptyType} />;

    return listItems.reverse().map((item, i) => (
      <ListItem key={`list-item-${i}`} item={item} type={type} winW={winW} />
    ));
  }

  render() {
    return <div className="list">{this.getListItems()}</div>;
  }
}

export default List;
