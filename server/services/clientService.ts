import { runFastQuery, runQuery } from '../database/databaseFunctions';
import { ApiClientInterface } from 'interfaces/client';

export class ClientService {

    static async loadAll(): Promise<ApiClientInterface[]> {
        const result = await runFastQuery("SELECT * FROM clients");
        return this.formatClientArray(result as ApiClientInterface[]);
    }

    static async loadClientById(id: string): Promise<ApiClientInterface | null> {
        const result = await runQuery("SELECT * FROM clients WHERE id = ?", [id]);
        const clientResult = this.formatClientArray(result as ApiClientInterface[]);

        if(clientResult.length > 0)
        {
            return clientResult[0];
        } else {
            return null;
        }
    }

    static async updateClient(clientObject: ApiClientInterface)
    {
        if(clientObject._id !== undefined)
        {
            await runQuery("UPDATE clients SET ? WHERE id = ?",
                [{
                    name: clientObject.name, 
                    email: clientObject.email, 
                    created_at: clientObject.created_at, 
                    updated_at: clientObject.updated_at
                },  clientObject._id])
            return clientObject;
        }
    }

    static async deleteClient(id: string)
    {
        await runQuery("DELETE FROM clients WHERE id = ?", [id]);
        return { _id: id };
    }

    static formatClientArray(array: ApiClientInterface[]):  ApiClientInterface[]
    {
        return array.map((client: ApiClientInterface) => {
            return {
                ...client,
                _id: client.id+"",
                created_at: new Date(Date.parse((typeof(client.created_at) === 'string') ? client.created_at : client.created_at.toDateString())),
                updated_at: new Date(Date.parse((typeof(client.updated_at) === 'string') ? client.updated_at : client.updated_at.toDateString()))
            }
        })
    }
}