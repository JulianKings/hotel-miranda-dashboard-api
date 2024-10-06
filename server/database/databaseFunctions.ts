import { connection } from "./databaseConnection";
import { QueryResult } from "mysql2";

export async function runQuery(query: string, params: Array<string | Object> = []): Promise<QueryResult>
{    
    const conn = await connection.getConnection();
    const [result] = await conn.query(query, params);
    conn.release();

    return result;
}

export async function runFastQuery(query: string): Promise<QueryResult>
{
    return runQuery(query, []);
}

export async function runExecute(query: string, params: Array<string | Object> = []): Promise<QueryResult>
{    
    const conn = await connection.getConnection();
    const [result] = await conn.execute(query, params);
    conn.release();

    return result;
}

export async function runFastExecute(query: string): Promise<QueryResult>
{
    return runExecute(query, []);
}