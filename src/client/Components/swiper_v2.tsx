import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper'
import { renderToString } from 'react-dom/server'
import 'swiper/swiper-bundle.css'
import './styles.css'

SwiperCore.use([Navigation, Pagination, Controller, Thumbs])

interface AppStates {
    slides: JSX.Element[]
    userSwipe: boolean
    currentSlide?: JSX.Element
    nextSlide?: JSX.Element
}

class App extends React.Component<{}, AppStates> {
    state: AppStates = {
        slides: [],
        userSwipe: false,
    }

    updateSlidesPack() {
        for (let i = 1; i < 14; i += 1) {
            this.state.slides.push(
                <SwiperSlide key={`slide-${i}`} tag="li">
                    <img
                        src={`https://picsum.photos/id/${i + 1}/500/300`}
                        style={{ listStyle: 'none' }}
                        alt={`Slide ${i}`}
                    />
                </SwiperSlide>
            )
        }

        this.state.currentSlide = this.state.slides.pop()
        this.state.nextSlide = this.state.slides.pop()
    }

    onSlideChange() {
        console.log('Work!')
        this.state.currentSlide = this.state.slides.pop()
    }

    render() {
        this.updateSlidesPack()
        return (
            <React.Fragment>
                <Swiper
                    id="controller"
                    onInit={(swiper) => {
                        swiper.slideNext();
                        swiper.update();
                    }}
                    onTouchEnd={()=>{this.state.userSwipe=true}}
                    onSlideChange={(swiper) => {
                        if(this.state.userSwipe===true) {
                            this.state.userSwipe = false;

                            this.state.currentSlide = this.state.nextSlide;
                            this.state.nextSlide = this.state.slides.pop();

                            swiper.removeSlide(0);
                            swiper.removeSlide(0);

                            swiper.appendSlide(renderToString(this.state.nextSlide));
                            swiper.prependSlide(renderToString(this.state.nextSlide));

                            swiper.update();
                        }
                    }}
                >
                    {
                        this.state.nextSlide
                    }
                    {
                        this.state.currentSlide
                    }
                    {
                        this.state.nextSlide
                    }
                </Swiper>
            </React.Fragment>
        )
    }
}

export default App
