import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const LITMIT = 3;
    return (
      <>
        <Header />
        {(assertions >= LITMIT) ? <p data-testid="feedback-text">Well Done!</p>
          : <p data-testid="feedback-text">Could be better...</p>}
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{Number(assertions)}</p>
        <div className="Feedback">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleClick }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.handleRanking }
          >
            Ranking
          </button>
        </div>

      </>

    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { assertions, score } }) => ({
  assertions,
  score,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
