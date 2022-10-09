import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouterAndRedux } from "./helpers/renderWithRouterAndRedux";
import App from "../App";

describe("Verification of Login Page", () => {
  it("Verifies if inputs and btn are render and btn enable", () => {

    renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");
    const buttonPlay = screen.getByTestId("btn-play");

    expect(buttonPlay).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(name).toBeInTheDocument();

    userEvent.type(email, "trybe@teste.com");
    userEvent.type(name, "trybe");

    expect(buttonPlay).toBeEnabled();
  });

  it("Verifies redirection of button Settings", async() => {

    const { history } = renderWithRouterAndRedux(<App />);

    const buttonSettings = screen.getByTestId("btn-settings");
    
    userEvent.click(buttonSettings);
    await screen.findByText("Settings:");
    
    const {location: { pathname }} = history;

    expect(pathname).toBe("/settings");
  });

  it("Verifies redirection of button Play ", async() => {

    const { history } = renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");

    userEvent.type(email, "trybe@teste.com");
    userEvent.type(name, "trybe");

    const buttonPlay = screen.getByTestId("btn-play");
    
    userEvent.click(buttonPlay);
    
    await screen.findByText("Game");
    
    const { location: { pathname }} = history;

    expect(pathname).toBe("/game");
  });


});
