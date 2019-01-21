import { connect } from 'react-redux';
import { createNewTodo, setTodoCreated } from '../../actions/actionCreators';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import DeleteButton from '../tools/DeleteButton';
import React, { Component } from 'react';

class TodoForge extends Component {
  static propTypes = {
    createNewTodo: func,
    setTodoCreated: func,
    todoCreated: object
  }

  state = {
    clearBtnVisible: false,
    createdTimeout: null,
    currentTodo: '',
    isActive: false,
    isDisabled: false,
    isSaved: false
  }

  componentDidMount() {
    this.focusTodo();
  }

  componentWillReceiveProps(nextProps) {
    const { todoCreated } = this.props;
    const { todoCreated: nextTodoCreated } = nextProps;

    if (Object.keys(nextTodoCreated).length > 0
      && (Object.keys(todoCreated).length === 0
        || (todoCreated.status
          && todoCreated.status !== nextTodoCreated.status))) {

      let isSuccess = nextTodoCreated.status === 'success';

      if (isSuccess) this.todoInput.value = '';

      this.setState({
        clearBtnVisible: false,
        createdTimeout: setTimeout(this.toggleSaved, 2000),
        isActive: false,
        isDisabled: true,
        isSaved: nextTodoCreated
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { currentTodo } = this.state;
    const { currentTodo: nextCurrentTodo } = nextState;

    if (currentTodo !== nextCurrentTodo) {
      this.setState({ clearBtnVisible: nextCurrentTodo.length !== 0 });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.createdTimeout);
  }

  clearTodo = e => {
    this.todoInput.value = '';

    this.focusTodo(e);
  };

  focusTodo = e => this.todoInput.focus();

  forgeTodo = () => {
    const { createNewTodo, setTodoCreated } = this.props;
    const { currentTodo: text } = this.state;

    if (text.length <= 2) {
      return setTodoCreated({
        message: 'Please use at least 2 letters.',
        status: 'warn'
      });
    }

    createNewTodo({ text });
  }

  getClearBtn = () => (
    <DeleteButton action="clear"
      keyDown={this.onResetKeyDown}
      mouseUp={this.clearTodo}
      name="todo"
    />
  );

  getSavedStatus = () => {
    const { todoCreated: { message, status }} = this.props;

    return <div className={`todo-created ${status}`}>{message}</div>;
  }

  onResetKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      this.clearTodo();
    } else if (e.keyCode === 27) {
      e.target.blur();
    }
  }

  onTextInputChange = e => {
    this.setState({ currentTodo: this.todoInput.value });
  }

  onTextKeyInput = e => {
    if (e.keyCode === 13) {
      this.forgeTodo();
    } else if (e.keyCode === 27) {
      this.todoInput.blur();
    }
  }

  toggleSaved = () => {
    const { setTodoCreated } = this.props;
    const { createdTimeout } = this.state;

    this.setState({
      currentTodo: '',
      isDisabled: false,
      isSaved: false
    });

    clearTimeout(createdTimeout);
    setTodoCreated({});
    this.focusTodo();
  }

  render() {
    const { clearBtnVisible, isActive, isDisabled, isSaved } = this.state;

    return (
      <div className={`todo-forge${isActive ? ' active' : ''}`}>
        <div className="todo-forge-container">
          <input aria-label="Add new todo"
            disabled={isDisabled}
            name="forge-todo"
            onBlur={e => this.setState({ isActive: !isActive })}
            onChange={this.onTextInputChange}
            onFocus={e => this.setState({ isActive: !isActive })}
            onKeyDown={this.onTextKeyInput}
            placeholder="Add new todo..."
            ref={ref => this.todoInput = ref}
            role="Textbox"
            type="text"
          />
          { clearBtnVisible ? this.getClearBtn() : null }
        </div>
        { isSaved ? this.getSavedStatus() : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todoCreated: state.todoCreated ? state.todoCreated : {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createNewTodo(params) {
    params.dispatch = dispatch;

    dispatch(createNewTodo(params));
  },
  setTodoCreated(params) {
    dispatch(setTodoCreated(params));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TodoForge)
);
