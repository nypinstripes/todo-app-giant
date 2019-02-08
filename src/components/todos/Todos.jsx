import { connect } from 'react-redux';
import { array, bool, func, number, string } from 'prop-types';
import { setTodos, setTodosUpdated } from '../../actions/actionCreators';
import { withRouter } from 'react-router-dom';
import ListHead from '../lists/ListHead';
import List from '../lists/List';
import React, { Component } from 'react';
import TodoForge from './TodoForge';
import Todo from './Todo';

class Todos extends Component {
  static propTypes = {
    setTodos: func,
    setTodosUpdated: func,
    todos: array,
    todosUpdated: bool,
    type: string,
    winW: number
  }

  state = {
    emptyType: {
      icon: 'icon-gear-large',
      subTitle: "Create todos by typing in the box above.",
      title: "You've got no todos."
    },
    listItems: []
  }

  componentWillMount() {
    this.props.setTodos();
  }

  componentWillReceiveProps(nextProps) {
    const { setTodosUpdated, todos, todosUpdated, type } = this.props;
    const {
      todos: nextTodos,
      todosUpdated: nextTodosUpdated,
      type: nextType
    } = nextProps;

    if (nextTodos && (todos.length !== nextTodos.length || type !== nextType)) {
      this.syncTodos({
        todos: nextTodos,
        type: nextType
      });
    }

    if (nextTodosUpdated && nextTodosUpdated !== todosUpdated) {
      this.syncTodos({
        todos: nextTodos,
        type: nextType
      });

      setTodosUpdated(false);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { setTodosUpdated, todosUpdated } = this.props;
    const { todos: nextTodos, todosUpdated: nextTodosUpdated, type: nextType } = nextProps;

    if (nextTodosUpdated && nextTodosUpdated !== todosUpdated) {
      this.syncTodos({
        todos: nextTodos,
        type: nextType
      });

      setTodosUpdated(false);
    }
  }

  getListItems = () => {
    const { type, winW } = this.props;
    const { emptyType, listItems } = this.state;

    return (
      <List emptyType={emptyType}
        listItems={listItems}
        ListItem={Todo}
        type={type}
        winW={winW}
      />
    );
  }

  syncTodos = params => {
    const { todos, type } = params;
    let listItems = todos;

    if (type !== 'all') listItems = todos.filter(todo => todo.status === type);

    this.setState({ listItems });
  }

  render() {
    return (
      <div className="todos page-root">
        <ListHead type={this.props.type} />
        <TodoForge />
        { this.getListItems() }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos ? state.todos : [],
  todosUpdated: state.todosUpdated ? state.todosUpdated : false
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setTodos() {
    dispatch(setTodos());
  },
  setTodosUpdated(params) {
    dispatch(setTodosUpdated(params));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Todos));
