import { QueryResultSchema } from 'interfaces/queryHelpers';
import { ApiAmenitiesInterface } from '../interfaces/amenities';
import { runExecute, runFastQuery, runQuery } from '../database/databaseFunctions';

export class AmenitiesService {

    static async loadAll(): Promise<ApiAmenitiesInterface[]> {
        const result = await runFastQuery("SELECT * FROM amenities");
        return AmenitiesService.formatAmenitiesArray(result as ApiAmenitiesInterface[]);
    }

    static async loadAmenityById(id: string): Promise<ApiAmenitiesInterface | null> {
        const result = await runQuery("SELECT * FROM amenities WHERE id = ?", [id]);
        const amenityResult = AmenitiesService.formatAmenitiesArray(result as ApiAmenitiesInterface[]);

        if(amenityResult.length > 0)
        {
            return amenityResult[0];
        } else {
            return null;
        }
    }

    static async updateAmenity(amenitiesObject: ApiAmenitiesInterface)
    {
        if(amenitiesObject._id === undefined)
        {
            const result = await runExecute("INSERT INTO amenities (name)" +
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
            await runQuery("UPDATE amenities SET ? WHERE id = ?",
                [{
                    name: amenitiesObject.name
                },  amenitiesObject._id])
            return amenitiesObject;
        }
    }

    static async deleteAmenity(id: string)
    {
        await runQuery("DELETE FROM amenities WHERE id = ?", [id]);
        return { _id: id };
    }

    static formatAmenitiesArray(array: ApiAmenitiesInterface[]):  ApiAmenitiesInterface[]
    {
        return array.map((amenity: ApiAmenitiesInterface) => {
            return {
                ...amenity,
                _id: amenity.id+""
            }
        })
    }
}