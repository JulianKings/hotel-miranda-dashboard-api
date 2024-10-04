export function isValidId(id: string): Boolean 
{
    if(isNaN(+id))
    {
        return false;
    }

    return true;
}