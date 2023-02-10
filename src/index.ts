import express, {Request,Response} from 'express'
import cors from "cors"; 
import { CreateUserr, UserDB } from './types';
import { UserDatabase } from './database/UserDatabase';
import { User } from './models/User';
import { create } from 'domain';

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post ("users/singunp", async (req:Request, res:Response)=>{
    try{
        const {id,name,email,password,role} = req.body as CreateUserr
        const userDBI = new UserDatabase()

        if (id !== undefined){
            if(typeof id !== "string"){
                res.status(400)
                throw new Error("'id' deve ser string");
                
            }
        }
        if (name !== undefined){
            if(typeof name !== "string"){
                res.status(400)
                throw new Error("'name' deve ser string");
                
            }
        }
        if(email !== undefined){
            if(typeof email !== "string"){
                res.status(400)
                throw new Error ("'email'deve ser string")
            }
        }
        if(role !== undefined){
            if(typeof role !== "string"){
                res.status(400)
                throw new Error("'role'deve ser string");
                
            }
        }
        // instanciando

        const userInstance = new User(
            id,
            name,
            email,
            password,
            role,
            new Date(). toISOString()
        )

        const newUserDB : UserDB = {
            id:userInstance.getId(),
            name:userInstance.getName(),
            email:userInstance.getEmail(),
            password:userInstance.getPassword(),
            role:userInstance.getRole(),
            created_at:userInstance.getCreated_at()
        }
        await userDBI.insertUser(userInstance)
        res.status(201).send(newUserDB)
        

    }catch(error){
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/users", async (req:Request, res:Response)=>{
    try{
        const name = req.query.name as string | undefined

        const usersDB : UserDB []= await new UserDatabase().findUser(name)

        const users: User[] = usersDB.map(
            (element)=>
            new User(
                element.id,
                element.name,
                element.email,
                element.password,
                element.role,
                element.created_at
            )
        )
        res.status(200).send(users)
    }catch(error){
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.post("/users/login", async(req:Request, res:Response)=>{
    try{
        const {email,password}= req.body as CreateUserr
        const userDBI = new UserDatabase ()

        if(typeof email !== "string"){
            res.status(400)
            throw new Error("'email' deve ser string");
            
        }
        if (typeof password !== "string"){
            res.status(400)
            throw new Error ("'password' deve ser string")
        }
            const check = await userDBI.check(email,password)

                if(check?.length ===0){
                    res.status(400)
                    throw new Error("usuario nao encontrado");
                    
                }

    } catch(error){
        console.log(error)
        
        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        
    }
})