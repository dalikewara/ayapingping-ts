import dotenv from 'dotenv';

export type Env = {
    appEnv: string;
    restPort: string;
    mysqlHost: string;
    mysqlPort: string;
    mysqlUser: string;
    mysqlPass: string;
    mysqlDBName: string;
}

export function parseEnv(): [Env | null, Error | null] {
    try {
        dotenv.config();

        return [{
            appEnv: process.env.APP_ENV || 'development',
            restPort: process.env.REST_PORT || '8080',
            mysqlHost: process.env.MYSQL_HOST || 'localhost',
            mysqlPort: process.env.MYSQL_PORT || '3306',
            mysqlUser: process.env.MYSQL_USER || '',
            mysqlPass: process.env.MYSQL_PASS || '',
            mysqlDBName: process.env.MYSQL_DB_NAME || ''
        }, null];
    } catch (err) {
        return [null, err instanceof Error ? err : new Error('general error')];
    }
}