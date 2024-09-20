/*import fs from 'fs'; 
import { ApiAbstractInterface } from '../interfaces/apiManagement';

export function readJsonFile(filePath: string)
{
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function updateJsonFile(filePath: string, newData: (ApiAbstractInterface | null)): void { 
    fs.readFile(filePath, 'utf8', (err, data) => { 
        if (err) { 
            console.error("Error reading file:", err); 
            return; 
        } 
 
        let jsonData = JSON.parse(data) as ApiAbstractInterface[]; 

        if(newData)
        { 
            if(jsonData.find((element: ApiAbstractInterface) => element.id === newData.id))
            {
                const updatedData = jsonData.map((element: ApiAbstractInterface) => {
                    if(element.id === newData.id)
                    {
                        return newData;
                    } else {
                        return element;
                    }
                });

                fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (err) => { 
                    if (err) { 
                        console.error("Error writing file:", err); 
                        return; 
                    } 
                }); 
            } else {
                jsonData.push(newData);

                fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => { 
                    if (err) { 
                        console.error("Error writing file:", err); 
                        return; 
                    } 
                }); 
            }
            
            return [newData];
        } else {
            return jsonData;
        }
    });
} 

export function deleteFromJsonFile(filePath: string, newData: ApiAbstractInterface): void { 
    fs.readFile(filePath, 'utf8', (err, data) => { 
        if (err) { 
            console.error("Error reading file:", err); 
            return; 
        } 
 
        let jsonData = JSON.parse(data); 

        if(newData)
        { 
            const updatedData = jsonData.filter((element: ApiAbstractInterface) => element.id !== newData.id);
            
            fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (err) => { 
                if (err) { 
                    console.error("Error writing file:", err); 
                    return; 
                } 
            });
        }
    });
}*/