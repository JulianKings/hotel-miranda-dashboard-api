import { QueryResultSchema } from 'interfaces/queryHelpers';
import { ApiUserInterface } from '../interfaces/user';
import { runExecute, runFastQuery, runQuery } from '../database/databaseFunctions';
import { getDateString } from '../util/dateHelper';

export class UserService {

    static async loadAll(): Promise<ApiUserInterface[]> {
        const result = await runFastQuery("SELECT * FROM users");
        return this.formatUserArray(result as ApiUserInterface[]);
    }

    static async loadUserById(id: string): Promise<ApiUserInterface | null> {
        const result = await runQuery("SELECT * FROM users WHERE id = ?", [id]);
        const userResult = this.formatUserArray(result as ApiUserInterface[]);

        if(userResult.length > 0)
        {
            return userResult[0];
        } else {
            return null;
        }
    }

    static async loadUserByName(name: string): Promise<ApiUserInterface | null> {
        const result = await runQuery("SELECT * FROM users WHERE name = ?", [name]);
        const userResult = this.formatUserArray(result as ApiUserInterface[]);

        if(userResult.length > 0)
        {
            userResult[0].password = (result as ApiUserInterface[])[0].password;
            return userResult[0];
        } else {
            return null;
        }
    }

    static async updateUser(userObject: ApiUserInterface)
    {
        if(userObject._id === undefined)
        {
            const result = await runExecute("INSERT INTO users (name, full_name, password, mail, profile_picture, start, description, contact, status, position)" +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                [userObject.name, userObject.full_name, userObject.password as string, userObject.mail, userObject.profile_picture, getDateString(new Date(Date.parse(userObject.start as string))), 
                    userObject.description, userObject.contact, userObject.status, userObject.position])

            const formatedResult = result as QueryResultSchema;
            const newId = (formatedResult.insertId !== undefined) ? formatedResult.insertId : -1;
            const userResult = { 
                ...userObject,
                id: newId,
                profile_picture: userObject.profile_picture.replaceAll('&#x2F;', '/'),
                _id: newId+"",
                start: new Date(Date.parse((typeof(userObject.start) === 'string') ? userObject.start : userObject.start.toDateString()))
            }
            return userResult;
        } else {
            const updateObj: ApiUserInterface = {
                name: userObject.name, 
                full_name: userObject.full_name, 
                mail: userObject.mail, 
                profile_picture: userObject.profile_picture, 
                start: getDateString(new Date(Date.parse(userObject.start as string))), 
                description: userObject.description, 
                contact: userObject.contact, 
                status: userObject.status, 
                position: userObject.position
            }

            if(userObject.password !== undefined && userObject.password !== '')
            {
                updateObj.password = userObject.password;
            }

            await runQuery("UPDATE users SET ? WHERE id = ?",
                [updateObj,  userObject._id])

            return this.formatUserArray([userObject])[0];
        }
    }

    static async deleteUser(id: string)
    {
        await runQuery("DELETE FROM users WHERE id = ?", [id]);
        return { _id: id };
    }

    static formatUserArray(array: ApiUserInterface[]):  ApiUserInterface[]
    {
        return array.map((user: ApiUserInterface) => {
            return {
                ...user,
                _id: user.id+"",
                password: '',
                profile_picture: user.profile_picture.replaceAll('&#x2F;', '/'),
                start: new Date(Date.parse((typeof(user.start) === 'string') ? user.start : user.start.toDateString()))
            }
        })
    }
}