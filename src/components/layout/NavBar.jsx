import { array, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { setAllTodosUpdated } from '../../actions/actionCreators';
import { uniqKey } from '../../utils';
import React, { Component } from 'react';

class NavBar extends Component {
  static propTypes = {
    page: string,
    setAllTodosUpdated: func,
    tabs: array
  }

  completeAllTodos = e => this.props.setAllTodosUpdated({ type: 'archived' })

  onActionKeyDown = e => {
    if (e.keyCode !== 9) e.preventDefault();
    if (e.keyCode === 13 || e.keyCode === 32) this.completeAllTodos(e);
  }

  render() {
    const { page, tabs } = this.props;

    return (
      <nav className="nav-bar" role="Navigation">
        <div className="nav-bar-container">
          <div className="nav-tabs" role="Menu">
            {tabs.map(tab => (
              <Link className={`nav-tab current-${page}`}
                id={`tab-${tab}`}
                key={uniqKey()}
                role="Menuitem"
                tabIndex="0"
                title={`${tab} todos`}
                to={`/${tab}`}
              >
                <span>{tab}</span>
              </Link>
            ))}
          </div>
          <div className="nav-actions">
            <div aria-label="Archive all todos."
              className="nav-action button"
              onMouseUp={this.completeAllTodos}
              onKeyDown={this.onActionKeyDown}
              role="Button"
              tabIndex="0"
            >
              <span className="button-text">Archive All Completed</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAllTodosUpdated(params) { dispatch(setAllTodosUpdated(params)); }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
