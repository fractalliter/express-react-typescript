import * as React from 'react';
import '../Less/app.less';
import * as ProfilePicture from '../Assets/profile.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import './styles.css';

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
  SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [controlledSwiper, setControlledSwiper] = useState(null);

  const slides = [];
  for (let i = 0; i < 5; i += 1) {
    slides.push(
      <SwiperSlide key={`slide-${i}`} tag="li">
        <img
          src={`https://picsum.photos/id/${i + 1}/500/300`}
          style={{ listStyle: 'none' }}
          alt={`Slide ${i}`}
        />
      </SwiperSlide>
    );
  }

  const thumbs = [];
  for (let i = 0; i < 5; i += 1) {
    thumbs.push(
      <SwiperSlide key={`thumb-${i}`} tag="li" style={{ listStyle: 'none' }}>
        <img
          src={`https://picsum.photos/id/${i}/163/100`}
          alt={`Thumbnail ${i}`}
        ></img>
      </SwiperSlide>
    );
  }

  const slides2 = [];
  for (let i = 9; i < 14; i += 1) {
    slides2.push(
      <SwiperSlide key={`slide-${i}`} tag="li">
        <img
          src={`https://picsum.photos/id/${i + 1}/500/300`}
          style={{ listStyle: 'none' }}
          alt={`Slide ${i}`}
        />
      </SwiperSlide>
    );
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
            <React.Fragment>
              <Swiper
                id="main"
                thumbs={{ swiper: thumbsSwiper }}
                controller={{ control: controlledSwiper }}
                tag="section"
                wrapperTag="ul"
                navigation
                pagination
                spaceBetween={0}
                slidesPerView={1}
                onInit={(swiper) => console.log('Swiper initialized!', swiper)}
                onSlideChange={(swiper) => {
                  console.log('Slide index changed to: ', swiper.activeIndex);
                }}
                onReachEnd={() => console.log('Swiper end reached')}
              >
                {slides}
              </Swiper>

              <Swiper
                id="thumbs"
                spaceBetween={5}
                slidesPerView={3}
                onSwiper={setThumbsSwiper}
              >
                {thumbs}
              </Swiper>

              <Swiper id="controller" onSwiper={setControlledSwiper}>
                {slides2}
              </Swiper>
        </React.Fragment>
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
