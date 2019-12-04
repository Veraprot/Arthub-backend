import isEmpty from '../validation/isEmpty';
import { SET_CURRENT_USER, SET_PROFILE_IMAGE, SET_COVER_PHOTO_IMAGE, GET_FRIENDS } from '../actions/types';

const initialState = {
  isAuthenticated: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        ...action.payload
      };

    case SET_PROFILE_IMAGE:
      return {
        ...state,
        avatar: action.payload
      };
    case SET_COVER_PHOTO_IMAGE:
      return {
        ...state,
        coverPhoto: action.payload
      };
    case GET_FRIENDS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
