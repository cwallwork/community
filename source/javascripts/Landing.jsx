import React        from 'react';
import Header       from './community/Header.jsx';

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Landing';
    }
    render() {
        return (
          <div className="landing_container">
            <div className="landing_hero">
              <header className="header">
                COMMUNITY CONVERSATIONS
                <h2>Together we can build bridges between American communities and refugee communities around the world</h2>
              </header>
              <p></p>
            </div>
            <div className="landing_body">
              <p>
                The global refugee crisis has grown into <b>the largest humanitarian issue of our time.</b> Together, we can change the way Americans talk and think about refugees.                
              </p>
              <p>
                Be part of this important effort. Sign up to host a <b>Community Conversation</b> - something as simple as a gathering of your close friends. Connect to the refugee experience through reading and discussing stories from the perspective of those displaced by violence and conflict.
              </p>
              <p>
                By signing up to host a community conversation, you will help encourage others to connect their own experiences with those of refugees around the world and enable them to appreciate and understand the global refugee crisis in new ways.
              </p>
              <a className="signup_button" href="/#/login">Sign Up</a>
            </div>
          </div>
        )
    }
}

export default Landing;
