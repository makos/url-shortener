import React from 'react';

class Link extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.shortLink ? this.props.shortLink : null}</p>
      </div>
    )
  }
}

export default Link;
