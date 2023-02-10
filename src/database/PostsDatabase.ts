import {PostsDB} from "../types"
import { BaseDatabase } from "./BaseDataBase"

export class PostDatabase extends BaseDatabase{
    static TABLE_POSTS = "posts"

    public async findPostsById(id:string){
        const [postsDB]: PostsDB[] | undefined[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .where({id})

        return postsDB
    }


}