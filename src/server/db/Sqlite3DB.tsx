import DBInterface from './interface'
import sqlite3 from 'sqlite3'

class Sqlite3DB {
    public getTopPosts(user_id: number, top_count: number) {}

    changePostRating(post_id: number, weight: number, user_id?: number) {}
    addPost(post_data: string, weight: number) {}
    removePost(post_id: number) {}
    getPostData(post_id: number) {}
    addUser(user_name: string) {}
    removeUser(user_id: number) {}
    getUserId(user_name: string) {}
}
