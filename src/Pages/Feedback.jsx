import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const LITMIT = 3;
    return (
      <>
        <Header />
        {(assertions >= LITMIT) ? <p data-testid="feedback-text">Well Done!</p>
          : <p data-testid="feedback-text">Could be better...</p>}
        <div>Feedback</div>
      </>

    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { assertions } }) => ({
  assertions,
});

export default connect(mapStateToProps)(Feedback);
