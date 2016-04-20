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
        const actualWidth = this.refs.bookItem.offsetWidth;
        const actualHeight = this.refs.bookItem.offsetHeight;
        const viewport = document.documentElement;
        
            newPlacement = 
                        rect.bottom + actualHeight > viewport.clientHeight ? 'top'    :
                        rect.right  + actualWidth  > viewport.clientWidth  ? 'left'   :
                        rect.left   - actualWidth  < 0 ? 'right'  :
                        rect.top    - actualHeight < 0 ? 'bottom' :
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
            <OverlayTrigger trigger={['hover', 'focus']} placement={this.state.placement} overlay={<Popover title={title}>
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
