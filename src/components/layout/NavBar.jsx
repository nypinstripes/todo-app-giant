import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { array, string } from 'prop-types';
import { uniqKey } from '../../utils/helperUtils';
import React from 'react';

const NavBar = props => (
  <nav className="nav-bar" role="Navigation">
    <div className="nav-tabs" role="Menu">
      {
        props.tabs.map(tab => (
          <Link className={`nav-tab current-${props.page}`}
            id={`tab-${tab}`}
            key={uniqKey()}
            role="Menuitem"
            tabIndex="0"
            title={`${tab} todos`}
            to={`/${tab}`}
          >
            <span>{tab}</span>
          </Link>
        ))
      }
    </div>
    <div className="nav-actions">
      <div className="nav-action button" role="Button" tabIndex="0">
        <span className="button-text">Archive All Completed</span>
      </div>
    </div>
  </nav>
);

NavBar.propTypes = {
  page: string,
  tabs: array
};

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
