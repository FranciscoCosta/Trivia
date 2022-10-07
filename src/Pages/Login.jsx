import React, { Component } from 'react';

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
        </div>
      </div>
    );
  }
}

export default Login;
