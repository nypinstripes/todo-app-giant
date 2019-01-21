import breakpoints from '../../../shared/data/breakpoints.json';
import { connect } from 'react-redux';
import { func, object, number } from 'prop-types';
import { setTodoDeleted, setTodoUpdated } from '../../actions/actionCreators';
import CheckControl from '../tools/CheckControl';
import DeleteButton from '../tools/DeleteButton';
import React, { Component } from 'react';
import SvgSymbol from '../tools/SvgSymbol';

class Todo extends Component {
  static propTypes = {
    setTodoDeleted: func,
    setTodoUpdated: func,
    item: object,
    winW: number
  }

  state = {
    currentStatus: false,
    isDeleted: false
  }

  componentWillMount() {
    const { item } = this.props;

    if (item.status) this.setState({ currentStatus: item.status });
  }

  componentWillReceiveProps(nextProps) {
    const { item } = this.props;
    const { item: nextItem } = nextProps;

    if (nextItem.status && item.status && nextItem.status !== item.status) {
      this.setState({ currentStatus: nextItem.status });
    }
  }

  deleteTodo = () => {
    const { item, setTodoDeleted } = this.props;

    this.setState({ isDeleted: true });
    setTodoDeleted({ item });
  }

  getTodoArchive = () => {
    const { item, winW } = this.props;
    const { currentStatus: status } = this.state;

    if (status !== 'active') {
      const { large: desktop } = breakpoints.viewport;
      let isArchived = status === 'archived';
      let buttonText = isArchived ? 'Unarchive' : 'Archive';
      let nextState = isArchived ? 'completed' : 'archived';
      let viewLarge = winW >= desktop;

      return (
        <div className={`todo-archive${viewLarge ? ` button` : ''}`}
          data-action={nextState}
          onMouseUp={e => this.updateTodo(nextState)}
          onKeyDown={this.handleKeyDown}
          role="Button"
          tabIndex="0"
        >
          <div className={viewLarge ? 'button-text' : 'todo-archive-box'}>
            {viewLarge ? buttonText : <SvgSymbol symbolId="#icon-archive" />}
          </div>
        </div>
      );
    }
  }

  getTodoModes = () => {
    const { currentStatus: status, isDeleted } = this.state;
    let deleted = isDeleted ? ' deleted' : '';

    return `todo list-item${deleted}${status ? ` ${status}` : ''}`;
  }

  handleKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      e.stopPropagation();

      switch(e.target.getAttribute('data-action')) {
        case 'archived': this.updateTodo('archived'); break;
        case 'completed': this.updateTodo('completed'); break;
        case 'delete': this.deleteTodo(); break;
        default: this.updateTodo('active');
      }
    } else if (e.keyCode === 27) {
      e.target.blur();
    }
  }

  updateTodo = type => {
    const { item, setTodoUpdated } = this.props;

    setTodoUpdated({ item, type });
  }

  render() {
    const { item: { id, text }} = this.props;
    const { currentStatus } = this.state;
    let action = 'completed';
    let checkActive;

    if (currentStatus === 'completed' || currentStatus === 'archived') {
      checkActive = true;

      if (currentStatus === 'completed') action = 'active';
    }

    return (
      <div className={this.getTodoModes()}
        ref={ref => this.listItem = ref}
        role="Listitem"
      >
        <div className="list-item-container">
          <CheckControl action={action}
            active={checkActive}
            checkId={`todo-item-${id}`}
            disabled={currentStatus === 'archived'}
            keyDown={this.handleKeyDown}
            mouseUp={e => this.updateTodo(action)}
            name="todo-complete"
          />
          <div className="todo-title">
            <div className="todo-title-container">
              <h4>{text}</h4>
            </div>
          </div>
          { this.getTodoArchive() }
          <DeleteButton action="delete"
            keyDown={this.handleKeyDown}
            mouseUp={this.deleteTodo}
            name="todo"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setTodoDeleted(params) {
    dispatch(setTodoDeleted(params));
  },
  setTodoUpdated(params) {
    dispatch(setTodoUpdated(params));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
