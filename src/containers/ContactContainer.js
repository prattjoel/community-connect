'use-strict';

import { connect } from 'react-redux';
import {
  setNameText,
  setEmailText,
  setMessageText,
  sendContactInfo
} from '../actions/ContactFormActions';
import ContactForm from '../components/ContactForm';

const mapStateToProps = state => {
    const { nameText, emailText, messageText, contactInfo } = state.contactForm;
  return (
    {
      nameText,
      emailText,
      messageText,
      contactInfo
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
    sendContactInfo: contactInfo => {
        dispatch(sendContactInfo(contactInfo));
    }
  });
};

const MessageInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactForm);

export default MessageInput;
