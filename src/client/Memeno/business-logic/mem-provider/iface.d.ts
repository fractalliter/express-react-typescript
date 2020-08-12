import Rating from './rating';
import Mem from './mem-iface';

interface IMemProvider {
    getCurrentMem: () => Mem;
    getNextMem: () => Mem;
    swapMem: (type: Rating) => void;
}

export default IMemProvider;
