import {Pool, createPool} from 'mysql2';

export function connectMySQL(host: string, port: number, user: string, pass: string, dbName: string): [Pool | null, Error | null] {
    try {
        const db: Pool = createPool({
            host: host,
            port: port,
            user: user,
            password: pass,
            database: dbName,
        });

        db.getConnection(function (err) {
            if (err) {
                // throw err;
            }
        });

        return [db, null];
    } catch (err){
        return [null, err instanceof Error ? err : new Error('general error')];
    }
}