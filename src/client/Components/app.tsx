import * as React from 'react';
import '../Less/app.less';
import {apiRoute} from '../utils';
import {AppProps, AppStates} from "../../server/domain/IApp";
import {ITest} from "../../server/domain/ITest";
import {Put, Post, Get, Delete} from "../Services";

export default class App extends React.Component<AppProps, AppStates> {
    state: AppStates = {
        username: '',
        textOfPostTest: '',
        textForPost: '',
        textOfPutTest: '',
        textForPut: '',
        textOfDeleteTest: '',
        textForDelete: '',
    };

    testGet = async (): Promise<void> => {
        try {
            const res: { username: string } = await Get(apiRoute.getRoute('test'))
            this.setState({username: res.username});
        } catch (e) {
            this.setState({username: e.message});
        }
    }


    testPost = async (): Promise<void> => {
        const {textOfPostTest} = this.state;

        if (textOfPostTest.trim()) {
            try {
                const res: ITest = await Post(
                    apiRoute.getRoute('test'),
                    {text: textOfPostTest}
                );
                this.setState({
                    textForPost: res.text,
                    response: res,
                });
            } catch (e) {
                this.setState({textForPost: e.message});
            }
        }
    }

    testPut = async (): Promise<void> => {
        const {textOfPutTest, response} = this.state;
        if (response && textOfPutTest.trim()) {
            try {
                const res: ITest = await Put(
                    apiRoute.getRoute('test'),
                    {text: textOfPutTest, id: response?._id}
                    );
                this.setState({textForPut: res.text, response: res});
            } catch (e) {
                this.setState({textForPut: e.message});
            }
        } else {
            this.setState({
                textForPut: "You don't have any resource in database to change. first use post",
            })
        }
    }

    testDelete = async (): Promise<void> => {
        const {response} = this.state;
        if (response) {
            try {
                const res: ITest = await Delete(apiRoute.getRoute('test'), {id: response?._id});
                this.setState({textForDelete: `${res._id} ${res.text}`, response: undefined});
            } catch (e) {
                this.setState({textForDelete: e.message});
            }
        } else {
            this.setState({
                textForDelete: "You don't have any resource in database to delete. first use post"
            })
        }
    }

    render() {
        const {username, textForPost, textForPut, textForDelete} = this.state;
        const inputText = "Input text...";
        return (
            <div>
                <div>
                    <div>
                        <div>
                            <button onClick={this.testGet}>{"Test Get"}</button>
                        </div>
                        <label>{"Test for Get: "}</label>
                        <h2>{!!username && `Hello ${username}!`}</h2>
                    </div>
                    <div>
                        <input onChange={e => this.setState({textOfPostTest: e.target.value})} placeholder={inputText}/>
                        <button onClick={this.testPost}>{"Test Post"}</button>
                    </div>
                    <div>
                        <label>{"Test for Post: "}</label>
                        <h3>{textForPost}</h3>
                    </div>
                    <div>
                        <input onChange={e => this.setState({textOfPutTest: e.target.value})} placeholder={inputText}/>
                        <button onClick={this.testPut}>{"Test Put"}</button>
                    </div>
                    <div>
                        <label>{"Test for Put: "}</label>
                        <h3>{textForPut}</h3>
                    </div>
                    <div>
                        <button onClick={this.testDelete}>{"Test Delete"}</button>
                    </div>
                    <div>
                        <label>{"Test for Delete: "}</label>
                        <h3>{textForDelete}</h3>
                    </div>
                </div>
            </div>
        );
    }
}
