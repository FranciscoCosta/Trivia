import { GET_USER,
  GET_SCORE, RANKING,
  GET_ASSERTIONS, GET_SETTINGS, CLEAR_SCORE } from '../Action/index';

const rankOrder = (ranking) => ranking
  .sort((a, b) => b.score - a.score);
const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
  settings: {
    difficulty: 'easy',
    numberQuestions: 5,
  },
  ranking: [],
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_USER:
    return { ...state, name: action.player.name, email: action.player.email };
  case GET_SCORE:
    return { ...state, score: Number(action.score) + Number(state.score) };
  case GET_ASSERTIONS:
    return { ...state, assertions: Number(state.assertions + 1) };
  case GET_SETTINGS:
    return { ...state, settings: action.settings };
  case CLEAR_SCORE:
    return { ...state, score: 0, assertions: 0 };
  case RANKING:
    return { ...state, ranking: rankOrder([...state.ranking, action.ranking]) };
  default:
    return state;
  }
}

export default player;
