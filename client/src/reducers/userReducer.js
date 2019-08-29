import isEmpty from '../validation/is-empty';
import { SET_CURRENT_USER, SET_PROFILE_IMAGE } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log(action.payload)
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case SET_PROFILE_IMAGE:
    console.log(action.payload)
    return {
      ...state,
      user: {
        ...state.user, 
        avatar: action.payload
      }
    };
    default:
      return state;
  }
}
