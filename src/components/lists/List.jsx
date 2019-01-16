import { connect } from 'react-redux';
import { object, string } from 'prop-types';
import ListItem from './ListItem';
import React, { Component } from 'react';

class List extends Component {
  static propTypes = {
    name: string,
    type: string
  }

  noop = () => {}

  render() {
    const { name, type } = this.props;

    return (
      <div className="list">
        <ListItem name="todo" type={type} />
        <ListItem name="todo" type={type} />
        <ListItem name="todo" type={type} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(List);
