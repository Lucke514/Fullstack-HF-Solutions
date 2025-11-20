import * as joi from 'joi';
import 'dotenv/config';

/**
 * @author Lucas Gonzalez
 * @description Configuracion de variables de entorno, primero se genera el schema, se validan errores y se exportan las variables
 */

// Schema de validacion de variables de entorno
export const envVarsSchema = joi.object({
    NODE_ENV    : joi.string().valid('development', 'production', 'test', 'provision').default('development'),
    PORT        : joi.number().default(3000),
    DATABASE_URL: joi.string().required().description('Database connection URL')
}).unknown(true);

// Validacion de variables de entorno
const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

// Exportacion de variables de entorno validadas
export const envs = {
    ENV   : envVars.NODE_ENV,
    PORT  : envVars.PORT,
    DB_URL: envVars.DATABASE_URL
};
