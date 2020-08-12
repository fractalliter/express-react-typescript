import sqlite3 from 'sqlite3';

export default class Sqlite3DB {
    db_: sqlite3;
    public constructor() {
        this.db_ = new sqlite3.Database('TestDatabase');
    }

    public getTopPosts(user_id: number, top_count: number) {
        return [0];
    }

    public changePostRating(post_id: number, weight: number, user_id?: number) {
        return;
    }

    public addPost(post_data: string, weight: number) {
        return 0;
    }

    public removePost(post_id: number) {
        return '';
    }

    public getPostData(post_id: number) {
        return '';
    }

    public addUser(user_name: string) {
        return 0;
    }

    public removeUser(user_id: number) {
        return '';
    }

    public getUserId(user_name: string) {
        return 0;
    }
}
