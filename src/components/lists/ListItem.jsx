import { connect } from 'react-redux';
import { object } from 'prop-types';
import React, { Component } from 'react';

class ListItem extends Component {
  static propTypes = {

  }

  noop = () => {}

  render() {
    return (
      <div className="list-item" />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
