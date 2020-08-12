import Rating from './rating';
import IMemProvider from './iface';

import Mems, { EndMem } from './resources-folder-mem-provider/mems';

class FolderMemProvider implements IMemProvider {
    private mems: typeof Mems;

    constructor() {
        this.mems = Mems;
    }

    getCurrentMem() {
        if (this.mems.length > 0) {
            return this.mems[0];
        }
        return EndMem;
    }
    getNextMem() {
        if (this.mems.length > 1) {
            return this.mems[1];
        }
        return EndMem;
    }
    swapMem(type: Rating) {
        const mem = this.mems.shift();
        if (mem) {
            this.mems.push(mem);
        }
    }
}

const memProvider = new FolderMemProvider();
export default memProvider;
