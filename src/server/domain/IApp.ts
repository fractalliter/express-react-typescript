import {ITest} from "./ITest";

export interface AppStates {
    username?: string;
    textOfPostTest: string,
    textForPost: string,
    textOfPutTest: string,
    textForPut: string,
    textOfDeleteTest: string,
    textForDelete: string,
    response?: ITest,
}

export interface AppProps {}
