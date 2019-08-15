import { GET_CONVERSATIONS, SET_CONVERSATION, GET_MESSAGES } from '../actions/types';

const initialState = {
  active: '',
  all: [], 
  messages: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return {
        ...state,
        active: action.payload[0]._id,
        all: action.payload
      };

    case SET_CONVERSATION:
        return {
          ...state,
          active: action.payload,
        };

    case GET_MESSAGES:
        return {
          ...state,
          messages: action.payload,
        };

    default:
      return state;
  }
}
