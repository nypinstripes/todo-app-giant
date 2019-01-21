import { connect } from 'react-redux';
import { func } from 'prop-types';
import { setAllTodosUpdated } from '../../actions/actionCreators';
import React, { Component } from 'react';

class ListActions extends Component {
  static propTypes = {
    setAllTodosUpdated: func
  }

  completeAllTodos = e => this.props.setAllTodosUpdated({ type: 'completed' })

  onActionKeyDown = e => {
    if (e.keyCode !== 9) e.preventDefault();
    if (e.keyCode === 13 || e.keyCode === 32) this.completeAllTodos(e);
  }

  render() {
    return (
      <div className="list-actions">
        <div aria-label="Complete all todos."
          className="list-action"
          onMouseUp={this.completeAllTodos}
          onKeyDown={this.onActionKeyDown}
          role="Button"
          tabIndex="0"
        >
          <span>Complete All</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAllTodosUpdated(params) { dispatch(setAllTodosUpdated(params)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListActions);
