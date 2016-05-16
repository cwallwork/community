import React        from 'react';
import Header       from './community/Header.jsx';
import Signup       from './Signup';

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
                Join us today and sign up to host a Community Conversation - something as simple as a gathering of your close friends. Connect to the refugee experience through reading and discussing stories from the perspective of those displaced by violence and conflict. 
              </p>
              <p>
                Once you sign up you will be able to access all the tools and resources you need to plan a great event and engage in a lively discussion. We make it easy. Choose a book, invite others to join you, use our resources and start reading!               
              </p>
              <Signup groundwork={this.props.groundwork}/>
              <p><a className="signup_button" href="/#/login">Log in</a></p>
            </div>
          </div>
        )
    }
}

export default Landing;
