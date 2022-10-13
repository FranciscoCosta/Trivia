import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Feedback.css';
import { motion } from 'framer-motion';
import { MD5 } from 'crypto-js';
import { GiPodiumWinner } from '@react-icons/all-files/gi/GiPodiumWinner';
import { clearScore, saveRanking } from '../Redux/Action/index';

class Feedback extends Component {
  handleClick = () => {
    const { history, dispatch } = this.props;
    const score = 0;
    dispatch(clearScore(score));
    history.push('/');
  };

  handleRanking = () => {
    const { history, dispatch, score, name, email } = this.props;
    const endpoint = 'https://www.gravatar.com/avatar/';
    const hash = MD5(email);
    const img = `${endpoint}${hash}`;
    const ranking = {
      score,
      name,
      img,
    };
    dispatch(saveRanking(ranking));
    history.push('/ranking');
  };

  render() {
    const { assertions, score, name, email } = this.props;
    const endpoint = 'https://www.gravatar.com/avatar/';
    const hash = MD5(email);
    const gravatar = `${endpoint}${hash}`;
    const LITMIT = 3;
    return (
      <div className="Feedback">
        <motion.div
          animate={ { y: 0, scale: 1 } }
          initial={ { y: -1200, scale: 0 } }
          transition={ { type: 'spring', duration: 1 } }
          className="Feedback__container"
        >
          <div className="Feedback__person">
            <p className="Feedback__person-name">{name}</p>
            <div className="Feedback__person-img">
              <img src={ gravatar } alt="" data-testid="header-profile-picture" />
            </div>
          </div>
          {(assertions >= LITMIT) ? <p data-testid="feedback-text">Well Done!</p>
            : <p data-testid="feedback-text">Could be better...</p>}
          <GiPodiumWinner
            type="button"
            data-testid="btn-ranking"
            onClick={ this.handleRanking }
            className="Feedback__btn-ranking"
            size={ 120 }
          >
            Ranking
          </GiPodiumWinner>
          <p data-testid="feedback-total-score">
            <span>Score: </span>
            {score}
          </p>
          <p data-testid="feedback-total-question">
            <span>Right Answers: </span>
            {Number(assertions)}
          </p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleClick }
            className="Feedback__playAgain-btn"
          >
            Play Again
          </button>

        </motion.div>
      </div>

    );
  }
}

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = ({ player: { assertions, score, email, name } }) => ({
  assertions,
  score,
  email,
  name,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
