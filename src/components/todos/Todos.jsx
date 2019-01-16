import { connect } from 'react-redux';
import { number, object, string } from 'prop-types';
import ListHead from '../lists/ListHead';
import List from '../lists/List';
import React, { Component } from 'react';
import TodoForge from './TodoForge';

class Todos extends Component {
  static propTypes = {
    type: string,
    winW: number
  }

  noop = () => {}

  render() {
    const { type, winW } = this.props;
    return (
      <div className="todos page-root">
        <ListHead name="todo" type={type} />
        <TodoForge />
        <List name="todo" type={type} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
