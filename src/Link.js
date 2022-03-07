import './Link.css'
import React from 'react';

class Link extends React.Component {
  constructor(props) {
    super(props);

    this.copyLink = this.copyLink.bind(this);
    this.state = {
      copied: false
    };
  }

  copyLink(e) {
    e.preventDefault();
    
    navigator.clipboard.writeText(this.props.shortLink)
      .then(() => this.setState({copied: true}),
            () => console.error("Error copying to clipboard. Check HTTPS."));
  }
  
  render() {
    const icon = this.state.copied ? <span>&#10004;</span> : <span>&#9112;</span>
    
    return (
      <div>
        {this.props.shortLink
         ? (<p>
              {this.props.shortLink} <a href="#" onClick={this.copyLink}>
                                       {icon}
                                     </a>
            </p>)
         : null
        }
      </div>
    )
  }
}

export default Link;
