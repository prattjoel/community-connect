'use-strict';

import { connect } from 'react-redux';
import {
  setNameText,
  setEmailText,
  setMessageText
} from '../actions/ContactFormActions';
import ContactForm from '../components/ContactForm';

const mapStateToProps = state => {
    const { nameText, emailText, messageText } = state.contactForm;
  return (
    {
      nameText,
      emailText,
      messageText
    }
  );
};

const mapDispatchToProps = dispatch => {
  return (
    {
    setNameText: text => {
        dispatch(setNameText(text));
    },
    setEmailText: text => {
        dispatch(setEmailText(text));
    },
    setMessageText: text => {
        dispatch(setMessageText(text));
    },
  });
};

const MessageInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactForm);

export default MessageInput;
