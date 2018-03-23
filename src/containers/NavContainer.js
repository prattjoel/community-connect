'use-strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
// import {
//   createReduxBoundAddListener,
//   createReactNavigationReduxMiddleware,
// } from 'react-navigation-redux-helpers';
import Router from '../Nav/Router';


// const addListener = createReduxBoundAddListener('root');

class MainNavigation extends Component {
  render() {
      const { addListener } = this.props
      const { navState, dispatch } = this.props;
    return (
      <Router
          navigation={addNavigationHelpers({
              dispatch,
              state: navState,
              addListener
           })}
      />
    );
  }
}

const mapStateToProps = state => {
    return {
            navState: state.nav
    };
};

export default connect(mapStateToProps)(MainNavigation);
