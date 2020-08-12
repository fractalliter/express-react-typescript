import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import './index.css';
import './swipe.css';

import Mem from '../../business-logic/mem-provider/mem-iface';
import Rating from '../../business-logic/mem-provider/rating';

interface IStaticMem {
    prevMem: Mem;
    currentMem: Mem;
    rating: Rating;
    isSwipeEnd: boolean;
    onDislikeClick: () => void;
    onLikeClick: () => void;
    onSwipeEnd: () => void;
}

const Index: React.FC<IStaticMem> = (props) => {
    const PREV_ANIMATION_STOP_NAME = 'prev-static-mem-animation-stop';
    const CURRENT_ANIMATION_STOP_NAME = 'current-static-mem-animation-stop';

    const PREV_ANIMATION_START_NAME = 'prev-static-mem-animation-start';
    const CURRENT_ANIMATION_START_NAME = 'current-static-mem-animation-start';

    const FINAL_ROTATION_ANGLE = 45;

    const [prevStaticMemStyle, setPrevStaticMemStyle] = useState(
        PREV_ANIMATION_STOP_NAME
    );
    const [currentStaticMemStyle, setCurrentStaticMemStyle] = useState(
        CURRENT_ANIMATION_STOP_NAME
    );

    const [currentMem, setCurrentMem] = useState(props.currentMem);
    const [prevMem, setPrevMem] = useState(props.prevMem);

    const handleAnimationStop = () => {
        setPrevStaticMemStyle(PREV_ANIMATION_STOP_NAME);
        setCurrentStaticMemStyle(CURRENT_ANIMATION_STOP_NAME);
    };

    const handleAnimationStart = () => {
        setPrevStaticMemStyle(PREV_ANIMATION_START_NAME);
        setCurrentStaticMemStyle(CURRENT_ANIMATION_START_NAME);
    };

    const handleFinalizeSwipe = () => {
        document.documentElement.style.setProperty(
            '--rotation-angle-remove-start',
            `rotateZ(-0grad)`
        );
        document.documentElement.style.setProperty(
            '--opacity-remove-start',
            `1`
        );
        handleAnimationStop();
    };

    const handleRunSwipe = (rating: Rating) => {
        const rotation =
            rating === Rating.Like
                ? FINAL_ROTATION_ANGLE
                : -FINAL_ROTATION_ANGLE;
        document.documentElement.style.setProperty(
            '--rotation-angle-remove-end',
            `rotateZ(${rotation}grad)`
        );
        document.documentElement.style.setProperty(
            '--rotation-angle-add-start',
            `rotateZ(${-rotation}grad)`
        );
        handleAnimationStart();
    };

    useEffect(() => {
        if (props.currentMem !== props.prevMem) {
            setCurrentMem(props.currentMem);
            setPrevMem(props.prevMem);
            handleRunSwipe(props.rating);
        }
    }, [props.currentMem]);

    const onCurrentAnimationEnd = () => {
        handleFinalizeSwipe();
        props.onSwipeEnd();
    };

    const swipeableHandlers = useSwipeable({
        onSwiped: (eventData) => {
            if (props.isSwipeEnd) {
                if (eventData.absX < 10) {
                    handleFinalizeSwipe();
                    return;
                }
                if (eventData.dir === 'Left') {
                    props.onDislikeClick();
                    return;
                }
                if (eventData.dir === 'Right') {
                    props.onLikeClick();
                    return;
                }
            }
        },
        onSwiping: (eventData) => {
            if (props.isSwipeEnd) {
                const rotation = eventData.absX / 5;
                const opacity = 1 - rotation / FINAL_ROTATION_ANGLE;
                document.documentElement.style.setProperty(
                    '--opacity-remove-start',
                    `${opacity}`
                );

                if (eventData.deltaX > 0) {
                    document.documentElement.style.setProperty(
                        '--rotation-angle-remove-start',
                        `rotateZ(-${rotation}grad)`
                    );
                    return;
                }
                if (eventData.deltaX < 0) {
                    document.documentElement.style.setProperty(
                        '--rotation-angle-remove-start',
                        `rotateZ(${rotation}grad)`
                    );
                    return;
                }
            }
        },
        ...{ trackTouch: true, trackMouse: true, delta: 0 },
    });

    return (
        <div className="static-mem" {...swipeableHandlers}>
            <style>{`.prev-static-mem:before { background-image: url('${prevMem.source}'); }`}</style>
            <div className={'prev-static-mem ' + prevStaticMemStyle}>
                <div
                    className="mem-image prev-mem-image"
                    style={{ backgroundImage: `url('${prevMem.source}')` }}
                />
            </div>
            <style>{`.current-static-mem:before { background-image: url('${currentMem.source}'); }`}</style>
            <div
                className={'current-static-mem ' + currentStaticMemStyle}
                onAnimationEnd={onCurrentAnimationEnd}
            >
                <div
                    className="mem-image current-mem-image"
                    style={{ backgroundImage: `url('${currentMem.source}')` }}
                />
            </div>
        </div>
    );
};

export default Index;
