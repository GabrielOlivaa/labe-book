export interface UserDB{
    id:string,
    name:string,
    email:string,
    password:string,
    role:string,
    created_at:string
    
}

export interface CreateUserr{
    id:string,
    name:string,
    email:string,
    password:string,
    role:string,
}

export interface PostsDB{
    name:string,
    creator_id: string,
    context: string,
    likes:number,
    dislikes:number,
    created_at:string,
    updated_at:string
}