import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import conversationReducer from './conversationReducer';
import itemReducer from './itemReducer';

export default combineReducers({
  user: userReducer, 
  errors: errorReducer, 
  conversations: conversationReducer, 
  items: itemReducer
})
