import * as React from 'react';
import '../Less/app.less';
import * as ProfilePicture from '../Assets/profile.png';

interface AppStates {
  username?: string;
  textOfPostTest: string,
  textForPost: string,
  textOfPutTest: string,
  textForPut:string,
  textOfDeleteTest: string,
  textForDelete: string,
}
export default class App extends React.Component<{}, AppStates> {
  state: AppStates = { 
    username: null,
    textOfPostTest: '',
    textForPost: null,
    textOfPutTest: '',
    textForPut:null,
    textOfDeleteTest: '',
    textForDelete: null,
   };

  getUser = () => {
    fetch('/api/test')
      .then(res => res.json())
      .then(res => this.setState({ username : res.username }));
  }


  sendUserInfo = () => {
    let text = this.state.textOfPostTest;

    text.trim() && 
    fetch('/api/test',{
      method: 'POST',
      headers: {
            'Content-Type': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
      body: JSON.stringify({text})})
    .then(res=> res.json()).then(res => this.setState({textForPost: res.text}));
  }

  changeUserInfo = () => {
    this.state.textOfPutTest.trim() &&
     fetch('/api/test',{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
         'Accept': 'application/json',
      },
      body: JSON.stringify({text: this.state.textOfPutTest})
    }).then(res=>res.json()).then(res => this.setState({textForPut: res.text}));
  }

  deleteUserInfo = () => {
    this.state.textOfDeleteTest.trim() &&
    fetch('/api/test',{
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
         'Accept': 'application/json',
      },
      body: JSON.stringify({text: this.state.textOfDeleteTest})
    }).then(res=>res.json()).then(res => this.setState({textForDelete: res.text}));
  }

  render() {
    const { username, textForPost, textForPut, textForDelete } = this.state;
    const inputText = "Input text...";
    return (
      <div>
        <div>
        <div>
        <div>
        <button onClick={this.getUser}>{"Test Get"}</button>
        </div>
        <label>{"Test for Get: "}</label>
        <h2>{!!username && `Hello ${username}!`}</h2>
        </div>
        <div>
          <input onChange={e => this.setState({ textOfPostTest: e.target.value })} placeholder={inputText}/>
          <button onClick={this.sendUserInfo}>{"Test Post"}</button>
          </div>
          <div>
          <label>{"Test for Post: "}</label>
          <h3>{textForPost}</h3>
          </div>
          <div>
            <input onChange={e => this.setState({textOfPutTest: e.target.value})} placeholder={inputText}/>
            <button onClick={this.changeUserInfo} >{"Test Put"}</button>
          </div>
          <div>
            <label>{"Put text test: "}</label>
            <h3>{textForPut}</h3>
          </div>
          <div>
            <input onChange={e => this.setState({textOfDeleteTest: e.target.value})} placeholder={inputText}/>
            <button onClick={this.deleteUserInfo} >{"Test Delete"}</button>
          </div>
          <div>
            <label>{"Delete text test: "}</label>
            <h3>{textForDelete}</h3>
          </div>
        </div>
      </div>
    );
  }
}
