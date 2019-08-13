import { GET_CONVERSATIONS } from '../actions/types';

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
    default:
      return state;
  }
}
