import React                                    from 'react';
import Header                                   from './Header.jsx';
import Tools                                    from './Tools.jsx';

class Community extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Community';
        this.groundwork = this.props.groundwork;
    }

    static contextTypes() {
      router: React.PropTypes.object
    }

    // componentWillMount() {
    //     if(!this.groundwork.auth.auth.gwid) {
    //       this.context.router.push('/login');
    //     }
    // }

    render() {
        return (
          <div className="community_container">
            <Header title="TOOLS"/>
            <Tools/>
          </div>
        )
    }
}

export default Community;
