import { ADD_ITEM, GET_ITEMS } from '../actions/types';

const initialState = {
  active: '',
  all: [], 
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        active: action.payload[0]._id,
        all: action.payload
      };

    case GET_ITEMS:
        return {
          ...state,
          active: action.payload,
        };

    default:
      return state;
  }
}
