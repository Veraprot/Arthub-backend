import { GET_CONVERSATIONS, SET_CONVERSATION } from '../actions/types';

const initialState = {
  active: [],
  all: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return {
        ...state,
        active: action.payload[0],
        all: action.payload
      };

    case SET_CONVERSATION:
        return {
          ...state,
          active: action.payload,
        };
    default:
      return state;
  }
}
