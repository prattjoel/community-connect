import { combineReducers } from 'redux';
import signIn from './SignInReducer';
import MessageReducer from './MessageReducer';
import ChatRoomReducer from './ChatRoomReducer';
import NavReducer from './NavReducer';
import ImageReducer from './ImageReducer';
import ContactFormReducer from './ContactFormReducer';


export default combineReducers({
    signIn,
    messages: MessageReducer,
    chatRooms: ChatRoomReducer,
    nav: NavReducer,
    imagesFromCR: ImageReducer,
    contactForm: ContactFormReducer
});
