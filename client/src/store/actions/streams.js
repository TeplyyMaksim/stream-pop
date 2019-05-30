import streams from 'api/streams';
import {
  CREATE_STREAM,
  GET_STREAMS,
  GET_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from './types';
import history from 'routes/history';

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, stream: response.data });
  history.push('/');
}

export const getStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: GET_STREAM, stream: response.data });
}

export const getStreams = () => async dispatch => {
  const response = await streams.get('/streams');

  dispatch({ type: GET_STREAMS, streams: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, stream: response.data });
  history.push('/');
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, id });
}