import { GET_CONVERSATIONS, CREATE_CONVERSATION, SET_CONVERSATION, GET_MESSAGES, SET_NEW_MESSAGE } from '../actions/types';

const initialState = {
  active: {},
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

    case SET_NEW_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages, 
          action.payload
        ],
      };

    case CREATE_CONVERSATION:
      return {
        ...state,
        active: action.payload.conversation._id, 
        all: state.all.push(action.payload.conversation)
      };

    default:
      return state;
  }
}
