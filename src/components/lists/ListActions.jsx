import { connect } from 'react-redux';
import { object } from 'prop-types';
import React, { Component } from 'react';

class ListActions extends Component {
  static propTypes = {

  }

  noop = () => {}

  render() {
    return (
      <div className="list-actions">
        <div className="list-action"
          role="Button"
          tabIndex="0"
          title="Complete all todos."
        >
          <span>Complete All</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListActions);
