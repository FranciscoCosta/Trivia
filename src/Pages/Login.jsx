import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../Redux/Action/index';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      btnDisable: true,
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  //   checkEmail = (email) => (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i));
  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.checkLogin();
  }

  checkLogin = () => {
    const { email, name } = this.state;
    if (name && email) {
      this.setState({
        btnDisable: false,
      });
    }
  };

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  dispatchAction = () => {
    const { dispatch } = this.props;
    const { name, email } = this.state;
    const player = {
      name,
      email,
    };
    dispatch(getUser(player));
  };

  handleClick = async () => {
    const { history } = this.props;
    this.dispatchAction();
    const endpoint = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(endpoint);
    const apiResponse = await response.json();
    const apiValues = Object.values(apiResponse);
    localStorage.setItem('token', apiValues[2]);
    history.push('/game');
  };

  render() {
    const { name, email, btnDisable } = this.state;
    return (

      <div className="Login">
        <div className="Login__container">
          <form className="Login__container-form">
            <div className="Login__form-field">
              <input
                type="text"
                className="Login__form-input"
                placeholder="Utilizador"
                data-testid="input-player-name"
                required
                name="name"
                onChange={ this.handleChange }
                value={ name }
              />
            </div>
            <div className="Login__form-field">
              <input
                type="text"
                className="Login__form-input"
                placeholder="Email"
                data-testid="input-gravatar-email"
                required
                onChange={ this.handleChange }
                value={ email }
                name="email"
              />
            </div>

            <div className="Login__form-submit">
              <button
                className="Login__button"
                onClick={ this.handleClick }
                type="button"
                disabled={ btnDisable }
                data-testid="btn-play"
              >
                Play
              </button>
            </div>
          </form>
          <button
            className="Login__button-settings"
            onClick={ this.handleSettings }
            type="button"
            data-testid="btn-settings"
          >
            Settings
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
