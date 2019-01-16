import { connect } from 'react-redux';
import { func, number } from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { setScrollBarOffset } from '../actions/actionCreators';
import Header from './layout/Header';
import keydown from 'react-keydown';
import NavBar from './layout/NavBar';
import NotFound from './tools/NotFound';
import React, { Component } from 'react';
import ScrollTopButton from './tools/ScrollTopButton';
import Todos from './todos/Todos';

class App extends Component {
  static propTypes = {
    scrollOffset: number,
    setScrollBarOffset: func
  }

  state = { winW: 0 }

  componentWillMount() {
    this.setWindowWidth();
  }

  componentDidMount() {
    let offset = parseInt(document.body.getAttribute('data-offset'));

    this.props.setScrollBarOffset(offset);
    window.addEventListener('resize', this.setWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWindowWidth);
  }

  getPageName = () => {
    let path = location.pathname;

    if (path === '/') return 'all';

    path = path.substring(1);

    if (path.indexOf('/') === -1) {
      return path;
    } else {
      let extension = '';

      return `${path.substring(0, path.indexOf('/'))}${extension}`;
    }
  }

  getScrollOffset = () => this.props.scrollOffset > 0 ? ' offset-scroll' : '';
  setWindowWidth = () => this.setState({ winW: window.innerWidth })

  render() {
    const { winW } = this.state;
    const navBarTabs = ['all', 'active', 'completed', 'archived'];

    return (
      <div className={`app ${this.getPageName()}${this.getScrollOffset()}`}>
        <ScrollTopButton />
        <Header />
        <NavBar page={this.getPageName()} tabs={navBarTabs} />
        <div className="app-body">
          <Switch>
            <Route exact
              path="/"
              render={props => <Todos type="all" winW={winW} {...props} />}
            />
            <Route exact
              path="/all"
              render={props => <Todos type="all" winW={winW} {...props} />}
            />
            <Route exact
              path="/active"
              render={props => <Todos type="active" winW={winW} {...props} />}
            />
            <Route exact
              path="/completed"
              render={props => (
                <Todos type="completed" winW={winW} {...props} />
              )}
            />
            <Route exact
              path="/archived"
              render={props => <Todos type="archived" winW={winW} {...props} />}
            />
            <Route render={props => <NotFound {...props} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  scrollOffset: state.scrollOffset ? state.scrollOffset : 0
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setScrollBarOffset(params) { dispatch(setScrollBarOffset(params)); }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));