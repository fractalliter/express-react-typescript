import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper'
import { renderToString } from 'react-dom/server'
import 'swiper/swiper-bundle.css'
import './styles.css'

SwiperCore.use([Navigation, Pagination, Controller, Thumbs])

interface AppStates {
    slides: JSX.Element[]
    currentSlide?: JSX.Element
}

class App extends React.Component<{}, AppStates> {
    state: AppStates = {
        slides: [],
    }

    updateSlidesPack() {
        for (let i = 9; i < 14; i += 1) {
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
    }

    onSlideChange() {
        console.log("Work!");
        this.state.currentSlide = this.state.slides.pop()
    }

    render() {
        this.updateSlidesPack()
        return (
            <React.Fragment>
                <Swiper
                    id="controller"
                    onTransitionEnd={(swiper) => {
                        this.state.currentSlide = this.state.slides.pop();
                        swiper.removeAllSlides();
                        swiper.appendSlide( renderToString(this.state.currentSlide));
                    }
                    }
                >
                    {this.state.currentSlide}
                </Swiper>
            </React.Fragment>
        )
    }
}

export default App
