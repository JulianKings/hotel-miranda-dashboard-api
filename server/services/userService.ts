import { QueryResultSchema } from 'interfaces/queryHelpers';
import { ApiUserInterface } from '../interfaces/user';
import mysql from 'mysql2/promise'

export class UserService {
    connection: mysql.Connection;

    constructor(connection: mysql.Connection)
    {
        this.connection = connection;
    }

    async loadAll(): Promise<ApiUserInterface[]> {
        const [result] = await this.connection.query("SELECT * FROM users");
        return this.formatUserArray(result as ApiUserInterface[]);
    }

    async loadUserById(id: string): Promise<ApiUserInterface | null> {
        const [result] = await this.connection.query("SELECT * FROM users WHERE id = ?", [id]);
        const userResult = this.formatUserArray(result as ApiUserInterface[]);

        if(userResult.length > 0)
        {
            return userResult[0];
        } else {
            return null;
        }
    }

    async loadUserByName(name: string): Promise<ApiUserInterface | null> {
        const [result] = await this.connection.query("SELECT * FROM users WHERE name = ?", [name]);
        const userResult = this.formatUserArray(result as ApiUserInterface[]);

        if(userResult.length > 0)
        {
            return userResult[0];
        } else {
            return null;
        }
    }

    async updateUser(userObject: ApiUserInterface)
    {
        if(userObject._id === undefined)
        {
            const [result] = await this.connection.execute("INSERT INTO users (name, full_name, password, mail, profile_picture, start, description, contact, status, position)" +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                [userObject.name, userObject.full_name, userObject.password, userObject.mail, userObject.profile_picture, userObject.start, 
                    userObject.description, userObject.contact, userObject.status, userObject.position])

            const formatedResult = result as QueryResultSchema;
            const newId = (formatedResult.insertId !== undefined) ? formatedResult.insertId : -1;
            const userResult = { 
                ...userObject,
                id: newId,
                _id: newId+"",
                start: new Date(Date.parse((typeof(userObject.start) === 'string') ? userObject.start : userObject.start.toDateString()))
            }
            return userResult;
        } else {
            await this.connection.query("UPDATE users SET ? WHERE id = ?",
                [{
                    name: userObject.name, 
                    full_name: userObject.full_name, 
                    password: userObject.password, 
                    mail: userObject.mail, 
                    profile_picture: userObject.profile_picture, 
                    start: userObject.start, 
                    description: userObject.description, 
                    contact: userObject.contact, 
                    status: userObject.status, 
                    position: userObject.position
                },  userObject._id])
           
            //const updatedUser = await userModel.findByIdAndUpdate(userObject._id, userObject, {});
            return userObject;
        }
    }

    async deleteUser(id: string)
    {
        const [result] = await this.connection.query("DELETE FROM users WHERE id = ?", [id]);
        return { _id: id };
    }

    formatUserArray(array: ApiUserInterface[]):  ApiUserInterface[]
    {
        return array.map((user: ApiUserInterface) => {
            return {
                ...user,
                _id: user.id+"",
                start: new Date(Date.parse((typeof(user.start) === 'string') ? user.start : user.start.toDateString()))
            }
        })
    }
}