import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

class TodoForge extends Component {
  static propTypes = {

  }

  state = {
    clearBtnVisible: false,
    currentTodo: '',
    isActive: false
  }

  componentDidMount() {
    this.focusTodo();
  }

  componentWillUpdate(nextProps, nextState) {
    const { currentTodo } = this.state;
    const { currentTodo: nextCurrentTodo } = nextState;

    if (currentTodo !== nextCurrentTodo) {
      this.setState({ clearBtnVisible: nextCurrentTodo.length !== 0 });
    }
  }

  clearTodo = e => {
    this.todoInput.value = '';

    this.focusTodo();
  };

  focusTodo = e => this.todoInput.focus();

  forgeTodo = () => {
    const { currentTodo } = this.state;

    if (currentTodo.length < 3) return;

    console.log('forge');

    // setImageSearch({ query });
  }

  getClearBtn = () => (
    <div aria-label="Clear Todo"
      className="todo-clear"
      onKeyDown={this.onResetKeyDown}
      onMouseUp={this.clearTodo}
      role="button"
      tabIndex="0"
    >
      <div className="todo-clear-cross" />
    </div>
  );

  onResetKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      this.clearTodo();
    }
  }

  onTextInputChange = e => {
    this.setState({ currentTodo: this.todoInput.value });
  }

  onTextKeyInput = e => {
    if (e.keyCode === 13) this.forgeTodo();
  }

  // toggleActive = e => {
  //   const { isActive } = this.state;

  //   return ;
  // }

  render() {
    const { isActive } = this.state;

    return (
      <div className={`todo-forge${isActive ? ' active' : ''}`}>
        <div className="todo-forge-container">
          <input aria-label="Add new todo"
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
          { this.state.clearBtnVisible ? this.getClearBtn() : null }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoForge));
