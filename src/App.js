import React from "react";
import "./App.css";
import UrlForm from "./UrlForm.js";
import Link from "./Link.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longLink: "",
      shortLink: "",
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange(link) {
    this.setState({ longLink: link });
  }

  handleFormSubmit() {
    fetch("http://localhost:3001", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longLink: this.state.longLink }),
    })
    /* TODO: Proper error handling. Now, it throws an error without specifying
       what went wrong - bad URL, server error? Need to check the server response 
       for that. */
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            this.setState({ shortLink: "Bad URL, please check your input." });
          }                
          throw new Error("Server returned error code " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ shortLink: data.shortLink });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1><a href="/">Short It</a></h1>
        </header>
        <div className="empty-row"></div>
        <div className="app-body">
          <Link shortLink={this.state.shortLink} className="link-container" />
          <UrlForm
            onFormChange={this.handleFormChange}
            onFormSubmit={this.handleFormSubmit}
          />
        </div>
      </div>
    );
  }
}

export default App;
