import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Ranking.css';
import { motion } from 'framer-motion';
import { clearScore } from '../Redux/Action/index';

class Ranking extends Component {
  state = {
    rankingOrder: [],
  };

  componentDidMount() {
    this.getData();
  }

  handleClick = () => {
    const { history, dispatch } = this.props;
    const score = 0;
    dispatch(clearScore(score));
    history.push('/');
  };

  getData = () => {
    const { ranking } = this.props;
    window.localStorage.setItem('player', JSON.stringify(ranking));
    const newObject = window.localStorage.getItem('player');
    const getRanking = JSON.parse(newObject);
    this.setState({
      rankingOrder: getRanking,
    });
  };

  render() {
    const { rankingOrder } = this.state;
    if (!rankingOrder) return <p>No rankings added!</p>;
    return (
      <div className="Ranking">
        <motion.div
          animate={ { y: 0, scale: 1 } }
          initial={ { y: -1200, scale: 0 } }
          transition={ { type: 'spring', duration: 1 } }
          className="Ranking__container"
        >
          <h1 data-testid="Ranking__title">Rankings :</h1>
          <div className="Ranking__container-placements">
            {rankingOrder.map((order, index) => (
              <div className="Ranking__placements" key={ index }>
                <div className="Ranking__placements-img">
                  <img src={ order.img } alt="player-pic" />
                </div>
                <div className="Ranking__placements-name">
                  <h4>{order.name}</h4>
                </div>
                <div>
                  <p className="Ranking__placements-score">
                    Total points :
                    {order.score}
                  </p>

                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleClick }
            className="Ranking__login-btn"
          >
            PLAY AGAIN
          </button>
        </motion.div>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { assertions, score, ranking } }) => ({
  assertions,
  score,
  ranking,
});

Ranking.propTypes = {
  ranking: PropTypes.shape({
    score: PropTypes.number,
    img: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Ranking);
