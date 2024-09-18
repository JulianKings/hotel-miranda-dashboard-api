import path from 'path';
import { deleteFromJsonFile, readJsonFile, updateJsonFile } from "../util/jsonParser";
import { ApiUserInterface } from '../interfaces/user';
import userModel from '../models/user';

export class UserService {
    async loadAll(): Promise<ApiUserInterface[]> {
        const allUsers = await userModel.find().exec();
        return allUsers;
    }

    async loadUserById(id: string): Promise<ApiUserInterface | null> {
        const userById = await userModel.findById(id).exec();

        if(userById !== null)
        {
            return userById
        } else {
            return null;
        }
    }

    async loadUserByName(name: string): Promise<ApiUserInterface | null> {
        const userById = await userModel.findOne({ name: name }).lean().exec();

        if(userById !== null)
        {
            return userById;
        } else {
            return null;
        }
    }

    async updateUser(userObject: ApiUserInterface)
    {
        if(userObject._id === undefined)
        {
            const newUser = new userModel(userObject);
            const userResult = await newUser.save();
            return userResult;
        } else {
            const updatedUser = await userModel.findByIdAndUpdate(userObject._id, userObject, {});
            return updatedUser;
        }
    }

    async deleteUser(userId: string)
    {
        const deleteUser = await userModel.findByIdAndDelete(userId);
        return { _id: userId };
    }
}