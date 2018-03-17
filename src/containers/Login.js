'use-strict';

import { connect } from 'react-redux';
import { signInUser, loading } from '../actions/LoginActions';
import FBLoginButton from '../components/login/FBLoginButton';

const mapStateToProps = state => {
  // console.log('mapStateToProps called');
  // console.log(state.signIn);
  return (
    {
        isSignedIn: state.signIn.isSignedIn,
        isLoading: state.signIn.isLoading
    }
  );
};

const mapDispatchToProps = dispatch => {
    // debugger;
  return (
    {
        updateSignIn: signedInStatus => {
            dispatch(signInUser(signedInStatus));
        },
        updateLoading: isLoading => {
            dispatch(loading(isLoading));
        }
  });
};

const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(FBLoginButton);

export default LoginPage;
