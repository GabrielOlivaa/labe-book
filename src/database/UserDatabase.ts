import { User } from "../models/User";
import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDataBase";

export class UserDatabase extends BaseDatabase {
    static TABLE_USERS = "user"
    public async insertUser(parameter: User) {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(parameter)
    }
    public async findUser(parameter: string | undefined): Promise<UserDB[]> {
        let result

        if (parameter) {
            const userDB: UserDB[] = await BaseDatabase.connection(
                UserDatabase.TABLE_USERS
            ).where("name", "LIKE", `%${parameter}%`)
            result = userDB
        } else {
            const userDB: UserDB[] = await BaseDatabase.connection(
                UserDatabase.TABLE_USERS
            )
            result = userDB
        }
        return result

    }
    public async check( email: string,password: string ){
        if (email) {
            const usersDB: UserDB[] = await BaseDatabase.connection(
                UserDatabase.TABLE_USERS
            ).where({ email,password })
            return usersDB
        }
        
    }
}