import path from 'path';
import { deleteFromJsonFile, readJsonFile, updateJsonFile } from "../util/jsonParser";
import { ApiUserInterface } from '../interfaces/user';

export class UserService {
    loadAll(): ApiUserInterface[] {
        return readJsonFile(path.resolve(__dirname, "../data/user.json"));
    }

    loadUserById(id: string): ApiUserInterface | null {
        const users = readJsonFile(path.resolve(__dirname, "../data/user.json"));
        const user = users.filter((userElement) => userElement.id === id);

        if(user.length > 0)
        {
            return user[0];
        } else {
            return null;
        }
    }

    loadUserByName(name: string): ApiUserInterface | null {
        const users = readJsonFile(path.resolve(__dirname, "../data/user.json"));
        const user = users.filter((userElement) => userElement.name === name);

        if(user.length > 0)
        {
            return user[0];
        } else {
            return null;
        }
    }

    updateUser(userObject: ApiUserInterface)
    {
        updateJsonFile(path.resolve(__dirname, "../data/user.json"), userObject)
        return userObject;
    }

    deleteUser(userId: string)
    {
        deleteFromJsonFile(path.resolve(__dirname, "../data/user.json"), { id: userId })
        return { id: userId };
    }
}