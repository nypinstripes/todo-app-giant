import { connect } from 'react-redux';
import { object } from 'prop-types';
import React, { Component } from 'react';

class ListInfo extends Component {
  static propTypes = {

  }

  noop = () => {}

  render() {
    return (
      <div className="list-info">
        <span>2 tasks remaining</span>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListInfo);
