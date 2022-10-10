import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getScore } from '../Redux/Action/index';

class Questions extends Component {
  state = {
    results: [],
    counter: 0,
    loading: true,
    waitAnswer: true,
    timer: 30,
    isDisable: false,
    answersRandom: [],
    correct: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await this.fetchQuestions();
    const TIMER = 1000;
    const timerConter = setInterval(() => {
      const { timer } = this.state;
      if (timer === 0) {
        this.setState({
          isDisable: true,
        });
        const add = 0;
        dispatch(getScore(add));
        clearInterval(timerConter);
      } else {
        this.setState({
          timer: timer - 1,
        });
      }
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
    console.log(apiResponse);
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

  handleClick = (event) => {
    const { dispatch } = this.props;
    const POINTS = 10;
    const { timer, results, counter } = this.state;
    const diff = results[counter].difficulty;
    if (event.target.value === 'truth') {
      if (diff === 'easy') {
        const multiply = 1;
        const score = POINTS + timer * multiply;
        dispatch(getScore(score));
      } else if (diff === 'medium') {
        const multiply = 2;
        const score = POINTS + timer * multiply;
        dispatch(getScore(score));
      } else {
        const multiply = 3;
        const score = POINTS + timer * multiply;
        dispatch(getScore(score));
      }
    } else {
      const score = 0;
      dispatch(getScore(score));
    }
    this.setState({
      waitAnswer: false,
    });
  };

  nextQuestion = () => {
    const FINAL_QUESTION = 4;
    const { counter } = this.state;
    const { history } = this.props;
    if (counter === FINAL_QUESTION) {
      history.push('/feedback');
    }
    this.setState({
      counter: counter + 1,
      timer: 30,
      waitAnswer: true,
    });
  };

  render() {
    const {
      results,
      counter,
      loading,
      waitAnswer,
      timer,
      isDisable,
      answersRandom,
      correct,
    } = this.state;
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
              value="truth"
              style={ {
                border: waitAnswer
                  ? '1px solid black'
                  : '3px solid rgb(6, 240, 15)',
              } }
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
              style={ {
                border: waitAnswer ? '1px solid black' : '3px solid red',
              } }
            >
              {answer}
            </button>
          )))}
        </div>
        {!waitAnswer ? (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            NEXT
          </button>
        ) : (
          <p />
        )}
      </>
    );
  }
}

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (score) => ({
  score,
});

Questions.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Questions);
