import { array, func, number, object, string } from 'prop-types';
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

    return listItems.map(item => (
      <ListItem key={`list-item-${item.id}`}
        item={item}
        type={type}
        winW={winW}
      />
    ));
  }

  render() {
    return (
      <div aria-live="polite" className="list" role="List">
        { this.getListItems() }
      </div>
    );
  }
}

export default List;
