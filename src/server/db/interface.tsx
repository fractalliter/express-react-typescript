export default interface DBInterface {
    getTopPosts(user_id: number, top_count: number): number[];
    changePostRating(post_id: number, weight: number, user_id?: number): void;
    addPost(post_data: string, weight: number): number;
    removePost(post_id: number): string;
    getPostData(post_id: number): string;
    addUser(user_name: string): number;
    removeUser(user_id: number): string;
    getUserId(user_name: string): number;
}
