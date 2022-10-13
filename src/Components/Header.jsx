import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import { PropTypes } from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const endpoint = 'https://www.gravatar.com/avatar/';
    const hash = MD5(email);
    const gravatar = `${endpoint}${hash}`;
    return (
      <div className="Header">
        <div className="Header__container">
          <div className="Header__img">
            <img src={ gravatar } alt="" data-testid="header-profile-picture" />
          </div>
          <div className="Header__name">
            <p data-testid="header-player-name">
              <span>Name: </span>
              {' '}
              {name}
            </p>
          </div>
          <div className="Header__score">
            <p data-testid="header-score">
              <span>Total Score: </span>
              {score}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { name, email, score } }) => ({
  name,
  email,
  score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
