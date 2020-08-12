import Mem from './business-logic/mem-provider/mem-iface';
import Rating from './business-logic/mem-provider/rating';
import memProvider from './business-logic/mem-provider/FolderMemProvider';
import { Action } from './actions';

type StateType = {
    currentMem: Mem;
    prevMem: Mem;
    rating: Rating;
    isSwipeEnd: boolean;
};

export const initState: StateType = {
    currentMem: memProvider.getCurrentMem(),
    prevMem: memProvider.getCurrentMem(),
    rating: Rating.Like,
    isSwipeEnd: true,
};

export default (state: StateType, action: Action): StateType => {
    switch (action.type) {
        case 'swipe-mems':
            return { ...state, ...action.payload, isSwipeEnd: false };

        case 'swipe-end': {
            return { ...state, isSwipeEnd: true };
        }
    }
};
