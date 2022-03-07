import './UrlForm.css';
import React from 'react';

class UrlForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange(e) {
    this.props.onFormChange(e.target.value);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit();
  }
  
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}> 
        <input type="text" name="URL" placeholder="URL to shorten"
               onChange={this.handleFormChange}
        />
        <button type="submit">
          <span className="mq-text">Submit</span>
          <span className="mq-icon">&#9986;</span>
        </button>
      </form>
    );
  }
}

export default UrlForm;
