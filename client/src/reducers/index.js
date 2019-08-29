import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import conversationReducer from './conversationReducer';

export default combineReducers({
  user: userReducer, 
  errors: errorReducer, 
  conversations: conversationReducer
})
