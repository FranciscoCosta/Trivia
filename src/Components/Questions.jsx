import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  state = {
    results: [],
    counter: 0,
    loading: true,
    waitAnswer: true,
    timer: 30,
    isDisable: false,
    answersRandom: '',
    correct: '',
  };

  async componentDidMount() {
    await this.fetchQuestions();
    const TIMER = 1000;
    setInterval(() => {
      const { timer } = this.state;
      if (timer === 0) {
        this.setState({
          isDisable: true,
        });
        return;
      }
      this.setState({
        timer: timer - 1,
      });
    }, TIMER);
  }

  fetchQuestions = async () => {
    const ERROR_API = 3;
    const { history } = this.props;
    const { counter } = this.state;
    const token = localStorage.getItem('token');
    const endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(endPoint);
    const apiResponse = await response.json();
    const { response_code: responseValidation, results } = apiResponse;
    if (responseValidation === ERROR_API) {
      window.localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ results, loading: false });
      this.handleQuestions();
      const answers = [
        results[counter].correct_answer,
        ...results[counter].incorrect_answers,
      ];
      const answersRandom = this.shuffle(answers);
      const correct = results[counter].correct_answer;
      this.setState({
        answersRandom,
        correct,
      });
    }
  };

  shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  handleQuestions = () => {
    console.log('aqui');
  };

  handleClick = () => {
    this.setState({
      waitAnswer: false,
    });
  };

  render() {
    const { results, counter, loading, waitAnswer, timer, isDisable,
      answersRandom, correct } = this.state;
    if (loading) {
      return <p>Carregando ...</p>;
    }

    return (
      <>
        <p>{timer}</p>
        <div>Questions</div>
        <h1 data-testid="question-category">{results[counter].category}</h1>
        <h2 data-testid="question-text">{results[counter].question}</h2>
        <div data-testid="answer-options">
          {answersRandom.map((answer) => (answer === correct ? (
            <button
              type="button"
              data-testid="correct-answer"
              key={ answer }
              onClick={ this.handleClick }
              disabled={ isDisable }
              style={ {
                border: waitAnswer ? '1px solid black' : '3px solid rgb(6, 240, 15)' } }
            >
              {answer}
            </button>
          ) : (
            <button
              type="button"
              data-testid="wrong-answer"
              key={ answer }
              onClick={ this.handleClick }
              disabled={ isDisable }
              style={ { border: waitAnswer ? '1px solid black' : '3px solid red' } }
            >
              {answer}
            </button>
          )))}
        </div>
      </>
    );
  }
}

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Questions);
