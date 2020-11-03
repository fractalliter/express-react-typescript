interface ITest {
    text: string;
}

export default class Test implements ITest {
    #_text: string;

    constructor(text: string) {
        this.#_text = text;
    }

    public get text() {
        return this.#_text
    }

    public set text(text: string) {
        this.#_text = text;
    }
}