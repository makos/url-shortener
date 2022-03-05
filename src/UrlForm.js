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
               className="url-input"
               onChange={this.handleFormChange}
        />
        <input type="submit" value="Submit" className="submit-button"/>
      </form>
    );
  }
}

export default UrlForm;
