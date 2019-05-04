import * as React from 'react';
import '../Less/app.less';
// import ProfilePicture from '../Assets/profile.png';

interface AppStates {
  username?: string;
}
export default class App extends React.Component<{}, AppStates> {
  state: AppStates = { username: null };

  componentDidMount() {

  }

  getUser = () => {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        <div>
          <button onClick={this.getUser}>
            Say Hi
          </button>
        </div>
        <div>
          {username && <h1>{`Hello ${username.toUpperCase()}`}</h1>}
        </div>
      </div>
    );
  }
}
