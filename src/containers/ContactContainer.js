'use-strict';

import { connect } from 'react-redux';
import {
  setNameText,
} from '../actions/ContactFormActions';
import ContactForm from '../components/ContactForm';

const mapStateToProps = state => {
  return (
    {
      nameText: state.contactForm.nameText,
    }
  );
};

const mapDispatchToProps = dispatch => {
  return (
    {
      setNameText: text => {
      dispatch(setNameText(text));
    },
  });
};

const MessageInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactForm);

export default MessageInput;
