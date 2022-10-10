import { GET_USER } from '../Action/index';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_USER:
    return { ...state, name: action.user.name, email: action.user.email };
  default:
    return state;
  }
}

export default user;
