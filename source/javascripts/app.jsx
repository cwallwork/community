import React                                                from "react";
import ReactDOM                                             from "react-dom";
import { Router, Route, IndexRoute, Link, browserHistory}   from 'react-router';
import R                                                    from "ramda";
import Login                                                from "./Login.jsx";
import Community                                            from "./Community.jsx";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.groundwork = new Groundwork({
          'apiKey': 'pub-un-test.community--gatIw1nhMSMNe6C1840E.OWKSMEUUYSDbpE6RvvqaeKOnhFKw8aoi.I75TNPIHnZSt4.3192cn6oP3_vaqTIiQ'
        });
        this.state = {
          profile: {},
          loggedIn: false
        }
    }


    render() {
        return (
          <div className="wrapper">
            <div clasName="content">
              { React.cloneElement( this.props.children, {groundwork: this.state.groundwork})}
            </div>
          </div>
          )
    }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="community" component={Community}/>
    </Route>
  </Router>
  , document.getElementById('root'));