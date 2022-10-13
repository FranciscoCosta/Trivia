import React, { Component } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { getScore, getAssertions } from '../Redux/Action/index';
import './Questions.css';
import Loading from './Loading';

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
    assertions: 0,
  };

  async componentDidMount() {
    await this.fetchQuestions();
    this.timerCount();
  }

  timerCount = () => {
    const { dispatch } = this.props;
    console.log('timer');
    const TIMER = 1000;
    this.interval = setInterval(() => {
      const { timer, waitAnswer } = this.state;
      if (timer === 0) {
        this.setState({
          isDisable: true,
          waitAnswer: false,
        });
        const add = 0;
        dispatch(getScore(add));
        clearInterval(this.interval);
        return;
      } if (!waitAnswer) {
        this.setState({
          timer,
        });
        clearInterval(this.interval);
      }
      console.log(timer);
      this.setState({
        timer: timer - 1,
      });
    }, TIMER);
    return;
  };

  fetchQuestions = async () => {
    const ERROR_API = 3;
    const { history, settings } = this.props;
    const { difficulty, numberQuestions } = settings;
    console.log(settings);
    const { counter } = this.state;
    const token = localStorage.getItem('token');
    const endPoint = `https://opentdb.com/api.php?amount=${numberQuestions}&difficulty=${difficulty}&token=${token}`;
    const response = await fetch(endPoint);
    const apiResponse = await response.json();
    console.log(apiResponse);
    const { response_code: responseValidation, results } = apiResponse;
    if (responseValidation === ERROR_API) {
      window.localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ results, loading: false });
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

  handleClick = (event) => {
    const { dispatch } = this.props;
    const POINTS = 10;
    const { timer, results, counter, assertions } = this.state;
    const diff = results[counter].difficulty;
    if (event.target.value === 'truth') {
      dispatch(getAssertions(assertions));
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
    }
    this.setState({
      waitAnswer: false,
    });
  };

  nextQuestion = () => {
    clearInterval(this.interval);
    this.timerCount();
    console.log('NEXT');
    const { history, settings: { numberQuestions } } = this.props;
    const { counter, results } = this.state;
    const FINAL_QUESTION = numberQuestions - 1;
    if (counter === FINAL_QUESTION) {
      history.push('/feedback');
    }
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      waitAnswer: true,
      timer: 30,
      isDisable: false,
    }), () => {
      const { counter: counterUpdate } = this.state;
      const answers = [
        results[counterUpdate].correct_answer,
        ...results[counterUpdate].incorrect_answers,
      ];
      const answersRandom = this.shuffle(answers);
      const correct = results[counterUpdate].correct_answer;
      this.setState({
        answersRandom,
        correct,
      });
    });
  };

  render() {
    const { results, counter, loading, waitAnswer, timer, isDisable, answersRandom,
      correct,
    } = this.state;
    if (loading) return <Loading />;
    return (
      <div className="Questions">
        <motion.div
          animate={ { opacity: 1, scale: 1 } }
          initial={ { opacity: 0, scale: 0 } }
          transition={ { type: 'spring', duration: 1 } }
          className="Questions__container"
        >
          <div className="Questions__category">
            <h2
              data-testid="question-category"
            >
              {results[counter].category}
            </h2>
          </div>
          <div className="Question__timer">
            <p>{timer}</p>
            <progress className="progress" value={ timer } max="30" />
          </div>
          <div className="Questions__question">
            <h1
              data-testid="question-text"
            >
              {results[counter].question}
            </h1>
          </div>
          <div
            data-testid="answer-options"
            className="Questions__answer-options"
          >
            {answersRandom.map((answer) => (answer === correct ? (
              <button
                className="Questions__answers"
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
                  background: waitAnswer
                    ? 'white'
                    : '#7fff7f',
                } }
              >
                {answer}
              </button>
            ) : (
              <button
                className="Questions__answers"
                type="button"
                data-testid="wrong-answer"
                key={ answer }
                onClick={ this.handleClick }
                disabled={ isDisable }
                style={ {
                  border: waitAnswer ? '1px solid black' : '3px solid red',
                  background: waitAnswer
                    ? 'white'
                    : 'crimson',
                } }
              >
                {answer}
              </button>
            )))}
          </div>
          {!waitAnswer && (
            <button
              type="button"
              data-testid="btn-next"
              className="Questions__btn-next"
              onClick={ this.nextQuestion }
              id="change"
            >
              NEXT
            </button>
          )}
        </motion.div>
      </div>
    );
  }
}
Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
const mapStateToProps = ({ player: { assertions, score, settings } }) => ({
  settings,
  assertions,
  score,
});
Questions.propTypes = {
  settings: PropTypes.shape({
    difficulty: PropTypes.string,
    numberQuestions: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Questions);
