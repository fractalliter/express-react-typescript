import * as React from 'react';
import Button from '@material-ui/core/Button';
import '../Less/app.less';

interface AppStates{
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
        <Button variant="contained" color="secondary" onClick={this.getUser}>
          Sign in
        </Button>
        </div>
        <div className="title1">
        <h1><a href="www.google.com">Say hi</a></h1>
        
        {username && <h1>{`Hello ${username}`}</h1>}
        </div>
      </div>
    );
  }
}
