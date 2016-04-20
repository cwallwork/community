import React            from 'react';
import {Popover}        from 'react-bootstrap';

class BookPopover extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'BookPopover';
    }

    render() {

      const {
              title,
              book
            } = this.props
    
      

      
        return (
          <Popover title={title} placement={placement}>
            <p><b>book.specs</b></p>
            <p>book.blurb</p>
          </Popover>
          );
    }
}

export default BookPopover;
