import React                                                from "react";
import ReactDOM                                             from "react-dom";
import { Router, Route, IndexRoute, Link, hashHistory }     from 'react-router';
import R                                                    from "ramda";
import Login                                                from "./Login.jsx";
import Signup                                               from "./Signup.jsx";
import Community                                            from "./community/Community.jsx";
import Landing                                              from "./Landing.jsx";
import Books                                                from "./community/books/Books.jsx";
import Invitation                                           from "./emails/Invitation.jsx";
import Thankyou                                             from "./emails/Thankyou.jsx";
import PasswordReset                                        from "./PasswordReset.jsx";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.groundwork = new Groundwork({
          'apiKey': 'pub-un-test.community--gatIw1nhMSMNe6C1840E.OWKSMEUUYSDbpE6RvvqaeKOnhFKw8aoi.I75TNPIHnZSt4.3192cn6oP3_vaqTIiQ'
        });
        this.state = {
          profile: {},
          loggedIn: false,
        }
    }

    static contextTypes = {
      router: React.PropTypes.object
    }


    render() {
        return (
          <div className="wrapper">
            <div clasName="content">
              { React.cloneElement( this.props.children, {groundwork: this.groundwork})}
            </div>
          </div>
          )
    }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing}/>
      <Route path="signup" component={Signup}/>
      <Route path="login" component={Login}/>
      <Route path="community" component={Community}/>
      <Route path="books" component={Books}/>
      <Route path="invitation" component={Invitation}/>
      <Route path="thankyou" component={Thankyou}/>
      <Route path="password-reset" component={PasswordReset}/>
    </Route>
  </Router>
  , document.getElementById('root'));