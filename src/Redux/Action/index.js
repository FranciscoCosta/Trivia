export const GET_USER = 'GET_USER';
export const GET_SCORE = 'GET_SCORE';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';
export const GET_SETTINGS = 'GET_SETTINGS';
export const CLEAR_SCORE = 'CLEAR_SCORE';
export const RANKING = 'RANKING';

export const getUser = (player) => ({
  type: GET_USER,
  player,
});

export const getScore = (score) => ({
  type: GET_SCORE,
  score,
});

export const getAssertions = (assertions) => ({
  type: GET_ASSERTIONS,
  assertions,
});

export const getSettings = (settings) => ({
  type: GET_SETTINGS,
  settings,
});

export const clearScore = (score) => ({
  type: CLEAR_SCORE,
  score,
});

export const saveRanking = (ranking) => ({
  type: RANKING,
  ranking,
});
