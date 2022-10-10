import React, { Component } from 'react';
import Header from '../Components/Header';

class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="feedback-text">Feedback</div>
      </>

    );
  }
}

export default Feedback;
