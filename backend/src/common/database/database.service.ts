import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { envs } from 'src/config';

@Injectable()
export class DatabaseService implements OnModuleInit {
    private readonly logger = new Logger(DatabaseService.name);
    private pool: Pool;

    onModuleInit() {
        this.pool = new Pool({
            connectionString        : envs.DB_URL,
            max                     : 10,
            idleTimeoutMillis       : 30000,
            connectionTimeoutMillis : 5000,
        });

        this.logger.log('Conexión a la base de datos lista');
    }

    /**
     * Query simple
     */
    async query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>> {
        try {
            return await this.pool.query<T>(sql, params);
        } catch (err) {
            this.logger.error(err.message);
            throw err;
        }
    }

    /**
     * Transacciones con callback
     */
    async transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
        const client = await this.pool.connect();

        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');
            return result;

        } catch (error) {
            await client.query('ROLLBACK');
            this.logger.error(`Transaction Fallida: ${error.message}`);
            throw error;
        } finally {
            client.release();
        }
    }
}
