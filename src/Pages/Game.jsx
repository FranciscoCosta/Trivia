import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Questions from '../Components/Questions';
import './Game.css';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <Questions history={ history } />
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
