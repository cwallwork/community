import React                          from 'react';
import {Popover, OverlayTrigger}      from 'react-bootstrap';

class BookItem extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'BookItem';
    }
    render() {
        const {
          title,
          author,
          blurb,
          specs,
          image,
          url
        } = this.props.book;

        return (
          <div className="BookItem" key={this.props.  key}>
            <OverlayTrigger trigger="hover" placement="bottom" overlay={<Popover title={title}>{blurb}</Popover>}>
              <img src={"../../images/books/" + image + ".jpg"}/>
              </OverlayTrigger>
            <h3>{title}</h3>
            <h4>{author}</h4>
            <h4>{specs}</h4>
          </div>
        )
    }
}

export default BookItem;
