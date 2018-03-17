'use-strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import Router from '../Nav/Router';

class MainNavigation extends Component {
  render() {
      const { navState, dispatch } = this.props;
    return (
      <Router
          navigation={addNavigationHelpers({ dispatch, state: navState })}
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
