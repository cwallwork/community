import React                              from 'react';
import Clipboard                          from 'clipboard';
import Header                             from '../community/Header.jsx';

class Invitation extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Invitation';
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
            <Header title="INVITATION EMAIL"/>
            <p className="email_intro">
              Here is an email you can use to invite your friends to your book club event. Just copy and paste the text below into your email client.
            </p>
            <p>
              (You can edit the text in the box below before you copy)
            </p>
            <div className="email_container" contentEditable>
              <h2>Hi Friends!</h2>
              <p>
                As you know, the global refugee crisis has been in the news a lot recently. As Americans, we are aware that a crisis is happening but are less connected to it and therefore aren’t reacting in the meaningful ways required to address an issue of this scale.
              </p>
              <p>
                I am writing to you today because I have discovered a way for me and my friends to get involved and help to change the conversation about refugees in the United States. Community Conversations is a new initiative that brings Americans together to read and discuss a refugee-related book together.
              </p>
              <p>
                I would like to participate in this initiative, and host a book club among my friends, friends of friends,and anyone else who would be interested. There are several tools and resources to help guide us through the process and initiate thoughtful conversation.
              </p>
              <p>
                Is this something you would be interested in joining? If so, here are some next steps to help us prepare.
              </p>
              <p className="invitation_point">
              1. Decide if you’d like to join the book club conversation and let me know via email by [INSERT DATE].
              </p>
              <p className="invitation_point">
                2. Help choose a book from <a href="http://letstalkaboutit.org/#/books" target="_blank">this curated list.</a> <span className="invitation_highlight"><b><i>(You can set up a voting system on Doodle or offer some suggested book ideas to get a conversation started. You should decide what is best way to approach with your group)</i></b></span>
              </p>
              <p className="invitation_point">
                3. Share your availability. <span className="invitation_highlight"><b><i>(We recommend providing three date/time options for people to choose from. You can also use Doodle or a similar tool for ease of collecting everyone’s availability.)</i></b></span>
              </p>
              <p>
                I am really looking forward to hosting this event and hope you will join me in learning more about the global refugee crisis. Let me know if you can participate. I am happy to answer any questions you may have.
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

export default Invitation;
