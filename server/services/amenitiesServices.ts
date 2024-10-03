import { QueryResultSchema } from 'interfaces/queryHelpers';
import mysql from 'mysql2/promise';
import { ApiAmenitiesInterface } from 'interfaces/amenities';

export class AmenitiesService {
    connection: mysql.Connection;

    constructor(connection: mysql.Connection)
    {
        this.connection = connection;
    }

    async loadAll(): Promise<ApiAmenitiesInterface[]> {
        const [result] = await this.connection.query("SELECT * FROM amenities");
        return this.formatAmenitiesArray(result as ApiAmenitiesInterface[]);
    }

    async loadAmenityById(id: string): Promise<ApiAmenitiesInterface | null> {
        const [result] = await this.connection.query("SELECT * FROM amenities WHERE id = ?", [id]);
        const amenityResult = this.formatAmenitiesArray(result as ApiAmenitiesInterface[]);

        if(amenityResult.length > 0)
        {
            return amenityResult[0];
        } else {
            return null;
        }
    }

    async updateAmenity(amenitiesObject: ApiAmenitiesInterface)
    {
        if(amenitiesObject._id === undefined)
        {
            const [result] = await this.connection.execute("INSERT INTO amenities (name)" +
                "VALUES (?);",
                [amenitiesObject.name])
            
            const formatedResult = result as QueryResultSchema;
            const newId = (formatedResult.insertId !== undefined) ? formatedResult.insertId : -1;
            const amenitiesResult = { 
                ...amenitiesObject,
                id: newId,
                _id: newId+""
            }
            return amenitiesResult;
        } else {
            await this.connection.query("UPDATE amenities SET ? WHERE id = ?",
                [{
                    name: amenitiesObject.name
                },  amenitiesObject._id])
            return amenitiesObject;
        }
    }

    async deleteAmenity(id: string)
    {
        const [result] = await this.connection.query("DELETE FROM amenities WHERE id = ?", [id]);
        return { _id: id };
    }

    formatAmenitiesArray(array: ApiAmenitiesInterface[]):  ApiAmenitiesInterface[]
    {
        return array.map((amenity: ApiAmenitiesInterface) => {
            return {
                ...amenity,
                _id: amenity.id+""
            }
        })
    }
}