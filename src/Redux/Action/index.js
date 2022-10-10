export const GET_USER = 'GET_USER';
export const GET_SCORE = 'GET_SCORE';

export const getUser = (player) => ({
  type: GET_USER,
  player,
});

export const getScore = (score) => ({
  type: GET_SCORE,
  score,
});
