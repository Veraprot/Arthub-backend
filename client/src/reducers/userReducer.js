import isEmpty from '../validation/is-empty';
import { SET_CURRENT_USER, SET_PROFILE_IMAGE, SET_COVER_PHOTO_IMAGE } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  info: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        info: action.payload
      };

    case SET_PROFILE_IMAGE:
      return {
        ...state,
        info: {
          ...state.info, 
          avatar: action.payload
        }
      };
    case SET_COVER_PHOTO_IMAGE:
      return {
        ...state,
        info: {
          ...state.info, 
          coverPhoto: action.payload
        }
      };
    default:
      return state;
  }
}
