import {
  SIGN_IN,
  SIGN_OUT,
} from 'store/actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: payload.userId };
    case SIGN_OUT:
      return { isSignedIn: false, userId: null };
    default:
      return state;
  }
};