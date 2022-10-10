import { GET_USER, GET_SCORE } from '../Action/index';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_USER:
    return { ...state, name: action.player.name, email: action.player.email };
  case GET_SCORE:
    return { ...state, score: Number(action.score) + Number(state.score) };
  default:
    return state;
  }
}



export default player;
