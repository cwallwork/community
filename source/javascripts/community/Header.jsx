import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Header';
    }
    render() {
      const title = this.props.title;

        return (
          <div className="header">
            <h1>COMMUNITY CONVERSATIONS:</h1>
            <h1>{title}</h1>
          </div>
        )
    }
}

export default Header;
