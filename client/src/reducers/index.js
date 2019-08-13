import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import conversationReducer from './conversationReducer';

export default combineReducers({
  auth: authReducer, 
  errors: errorReducer, 
  conversations: conversationReducer
})
