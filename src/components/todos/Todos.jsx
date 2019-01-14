import { connect } from 'react-redux';
import { number, object, string } from 'prop-types';
import React, { Component } from 'react';

class Todos extends Component {
  static propTypes = {
    type: string,
    winW: number
  }

  noop = () => {}

  render() {
    return (
      <div className="todos">xyz</div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
