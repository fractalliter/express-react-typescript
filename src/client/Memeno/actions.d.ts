import Mem from './business-logic/mem-provider/mem-iface';
import Rating from './business-logic/mem-provider/rating';

type SwipeMemsAction = {
    type: 'swipe-mems';
    payload: {
        rating: Rating;
        currentMem: Mem;
        prevMem: Mem;
    };
};
type SwipeEndAction = {
    type: 'swipe-end';
};

export type Action = SwipeMemsAction | SwipeEndAction;
