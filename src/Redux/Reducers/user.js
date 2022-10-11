import { GET_USER, GET_SCORE, GET_ASSERTIONS } from '../Action/index';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_USER:
    return { ...state, name: action.player.name, email: action.player.email };
  case GET_SCORE:
    return { ...state, score: Number(action.score) + Number(state.score) };
  case GET_ASSERTIONS:
    return { ...state, assertions: Number(state.assertions + 1) };
  default:
    return state;
  }
}

export default player;
