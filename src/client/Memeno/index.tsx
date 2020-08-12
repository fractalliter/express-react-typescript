import React, { useReducer } from 'react';
import './index.css';

import MenuButton from './components/MenuButton';
import Header from './components/Header';
import AvatarButton from './components/AvatarButton';
import StaticMem from './components/StaticMem';
import DislikeButton from './components/DislikeButton';
import LikeButton from './components/LikeButton';

import Rating from './business-logic/mem-provider/rating';
import memProvider from './business-logic/mem-provider/FolderMemProvider';

import reducer, { initState } from './reducer';

const Index: React.FC = (props) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const updateMems = (rating: Rating) => {
        dispatch({
            type: 'swipe-mems',
            payload: {
                rating: rating,
                prevMem: state.currentMem,
                currentMem: memProvider.getCurrentMem(),
            },
        });
    };

    const onLikeClick = () => {
        if (state.isSwipeEnd) {
            memProvider.swapMem(Rating.Like);
            updateMems(Rating.Like);
        }
    };

    const onDislikeClick = () => {
        if (state.isSwipeEnd) {
            memProvider.swapMem(Rating.Dislike);
            updateMems(Rating.Dislike);
        }
    };

    const onSwipeEnd = () => {
        dispatch({ type: 'swipe-end' });
    };

    return (
        <div className="Memeno">
            <div className="header">
                <div className="memeno-menu-button">
                    <MenuButton />
                </div>
                <div className="memeno-header">
                    <Header>memeno</Header>
                </div>
                <div className="memeno-avatar-button">
                    <AvatarButton
                        img={require('./resources/avatar-example.jpg')}
                    />
                </div>
            </div>
            <div className="content">
                <StaticMem
                    currentMem={state.currentMem}
                    prevMem={state.prevMem}
                    rating={state.rating}
                    isSwipeEnd={state.isSwipeEnd}
                    onDislikeClick={onDislikeClick}
                    onLikeClick={onLikeClick}
                    onSwipeEnd={onSwipeEnd}
                />
            </div>
            <div className="footer">
                <DislikeButton onClick={onDislikeClick} />
                <LikeButton onClick={onLikeClick} />
            </div>
        </div>
    );
};

export default Index;
