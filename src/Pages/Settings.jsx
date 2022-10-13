import React, { Component } from 'react';
import './Settings.css';
import PropTypes from 'prop-types';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import { getSettings } from '../Redux/Action/index';

class Settings extends Component {
  state = {
    difficulty: 'easy',
    numberQuestions: 5,
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleDifficulty = (event) => {
    this.setState({
      difficulty: event.target.value,
    });
  };

  handleNumber = (event) => {
    this.setState({
      numberQuestions: event.target.value,
    });
  };

  handleSettings = () => {
    const { difficulty, numberQuestions } = this.state;
    const { dispatch, history } = this.props;
    const settings = {
      difficulty,
      numberQuestions,
    };
    dispatch(getSettings(settings));
    history.push('/');
  };

  render() {
    return (
      <div className="Settings">
        <motion.div
          animate={ { y: 0, scale: 1 } }
          initial={ { y: -1200, scale: 0 } }
          transition={ { type: 'spring', duration: 1 } }
          className="Settings__container"
        >
          <div className="Settings__login-btn">
            <FaArrowLeft size="35" onClick={ this.handleClick } />
          </div>

          <h1 data-testid="settings-title" className="Settings__title">
            Settings:
          </h1>
          <h2 className="Settings__difficulty-title">Difficulty level :</h2>
          <div className="Settings__difficulty">
            <button
              type="button"
              className="Settings__difficulty-btn green"
              value="easy"
              onClick={ this.handleDifficulty }
            >
              Easy
            </button>
            <button
              type="button"
              className="Settings__difficulty-btn yellow"
              value="medium"
              onClick={ this.handleDifficulty }
            >
              Medium
            </button>
            <button
              type="button"
              className="Settings__difficulty-btn red"
              value="hard"
              onClick={ this.handleDifficulty }
            >
              Hard
            </button>
          </div>
          <h2 className="Settings__questions-title">Number of Questions:</h2>
          <div className="Settings__questions">
            <button
              type="button"
              className="Settings__questions-btn green"
              value="5"
              onClick={ this.handleNumber }
            >
              5
            </button>
            <button
              type="button"
              className="Settings__questions-btn yellow"
              value="10"
              onClick={ this.handleNumber }
            >
              10
            </button>
            <button
              type="button"
              className="Settings__questions-btn red"
              value="15"
              onClick={ this.handleNumber }
            >
              15
            </button>
          </div>
          <button
            type="button"
            className="Settings__save-btn"
            onClick={ this.handleSettings }
          >
            Save

          </button>
        </motion.div>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Settings);
