import React                          from 'react';
import {OverlayTrigger, Popover}      from 'react-bootstrap';
import {clone}                        from 'ramda';

class BookItem extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'BookItem';
        this.state = {
          placement: 'bottom'
        }
    }

    componentDidMount() {
      this.updatePlacement();
    }

    updatePlacement() {
      let newPlacement = clone(this.state.placement);

        const rect = this.refs.bookItem.getBoundingClientRect();
        const viewport = document.documentElement;

        const spaceTop = rect.top;
        const spaceLeft = rect.left;
        const spaceBottom = viewport.clientHeight - rect.bottom;
        const spaceRight = viewport.clientWidth - rect.right;

        const maxSpace = Math.max(spaceTop, spaceLeft, spaceRight, spaceBottom);

        newPlacement = maxSpace == spaceBottom ? 'bottom' :
                       maxSpace == spaceLeft   ? 'left' :
                       maxSpace == spaceRight  ? 'right' :
                       maxSpace == spaceTop    ? 'top' :
                       this.state.placement

        if(this.state.placement != newPlacement) {
          this.setState({placement: newPlacement});
        }
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
          <div onMouseEnter={() => this.updatePlacement()}ref="bookItem" className="BookItem" key={this.props.key}>
            <OverlayTrigger trigger={['hover', 'focus']} placement={this.state.placement} overlay={<Popover id="blurb_pop" title={title}>
            <p><b>{specs}</b></p>
            {blurb}
            </Popover>}>
              <img src={"../../images/books/" + image + ".jpg"}/>
            </OverlayTrigger>
          </div>
        )
    }
}

export default BookItem;
