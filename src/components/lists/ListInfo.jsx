import { array, string } from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class ListInfo extends Component {
  static propTypes = {
    todos: array,
    type: string
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { todos } = this.props;
    const { todos: nextTodos } = nextProps;

    return todos.length !== nextTodos;
  }

  getListInfo = () => {
    const { todos, type } = this.props;
    let nextType = type === 'all' ? 'active' : type;
    let nextTodos = todos.filter(todo => todo.status === nextType);
    let listText = type === 'all' ? 'tasks remaining' : `${type} todos`;

    return `${nextTodos.length} ${listText}`;
  }

  render() {
    return (
      <div className="list-info">
        <span>{this.getListInfo()}</span>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos ? state.todos : []
});

export default connect(mapStateToProps)(ListInfo);
