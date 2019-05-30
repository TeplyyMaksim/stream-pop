import {
  EDIT_STREAM,
  GET_STREAM,
  CREATE_STREAM,
  DELETE_STREAM,
  GET_STREAMS,
} from 'store/actions/types';
import { omit, mapKeys } from 'lodash';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, { type, ...payload }) => {
  switch (type) {
    case GET_STREAMS: {
      const { streams } = payload;

      return { ...state, ...mapKeys(streams, 'id') };
    }
    case EDIT_STREAM:
    case GET_STREAM:
    case CREATE_STREAM: {
      const {
        stream,
        stream: { id },
      } = payload;

      return {
        ...state,
        [id]: stream,
      };
    }
    case DELETE_STREAM: {
      const { id } = payload;

      return omit(state, id);
    }
    default: {
      return state;
    }
  }
};