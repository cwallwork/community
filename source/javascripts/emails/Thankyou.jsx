import React                              from 'react';
import Clipboard                          from 'clipboard';
import Header                             from '../community/Header.jsx';

class Thankyou extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Thankyou';
        this.state = {
          givenName: "Your ",
          familyName: "Name"
        };
        this.clipboard = new Clipboard('.copy_button');
    }

    componentWillMount() {
      this.props.groundwork.profiles.fetch(this.props.groundwork.auth.auth.gwid)
      .then( (response) => {
          console.log(response);
          this.setState({
            givenName: response.data.profile.givenName,
            familyName: response.data.profile.familyName
          });
      })
      .catch( (response) => {
        
      });     
    }
    
    render() {
        return (
          <div className="email">
            <Header title="THANKYOU EMAIL"/>
            <p className="email_intro">
              Here is an email you can use to thank your friends for participating in your book club. Just copy and paste the text below into your email client.
            </p>
            <p>
              (You can edit the text in the box below before you copy)
            </p>
            <div className="email_container">
              <h2>Hi Friends!</h2>
              <p>
                It was great to see you last night. I really enjoyed our meaningful conversations about [BOOK TITLE] especially [INSERT REFERENCE TO SPECIFIC CONVERSATION]. Today, I feel more connected to the global refugee crisis and want to continue learning about the situation. I hope you do too.
              </p>
              <p>
                As you know, Community Conversations is a brand new program aimed at changing the way Americans think and talk about refugees. Since we were some of the very first participants, the organizers would appreciate any feedback you have about your experience as well as the overall process.
              </p>
              <p>
                Please take this brief survey [hyperlink to participant survey] so that they can make improvements before sharing the program with a larger audience.
              </p>
              <p>
                To learn more about the refugee crisis, check out the <a href="http://letstalkaboutit.org/public/resources.pdf" target="_blank">resources</a>.
              </p>
              <p>
                If you are interested in hosting your own Community Conversations event, you can learn more about the different hosting options <a href="http://letstalkaboutit.org" target="_blank">here.</a>
              </p>  
              <p>
                Thank you again for joining me last night. If you have any questions, please reach out to me or send an e­mail to erin@unrefugees.org. 
              </p> 
              <p>
                Thanks,
              </p>
              <p>
                {this.state.givenName + " " + this.state.familyName} 
              </p>
            </div>
            <button className="copy_button" data-clipboard-target=".email_container">Copy to Clipboard</button>
          </div>
        );
    }
}

export default Thankyou;
