import { GET_CONVERSATIONS } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  convos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      console.log(action.payload)
      return {
        ...state,
        conversations: action.payload.conversations
      };
    default:
      return state;
  }
}
