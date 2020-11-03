import {Interface} from "readline";

interface IApi {
    host: string;
    getRoute: Function;
    setRoute?: Function;
}

class Api implements IApi {
    host: string;
    constructor(host: string) {
        this.host = host;
    }
    getRoute(routeName: string) {
        return `${this.host}/api/${routeName}`
    };

}

const apiRoute: Api = new Api("http://localhost:3000");

export {
    apiRoute,
}