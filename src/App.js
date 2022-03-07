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
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.setState({ shortLink: data.shortLink });
      })
      .catch((error) => {
        console.error("Error:", error);
        this.setState({ shortLink: "Something went wrong. Try again!" });
      });
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Short It</h1>
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
