/**
 * @author Lucas Gonzalez
 * @description Clase de producto que retornaran los endpoints
 */
export class Product {
    id              : number;
    title           : string;
    price           : number;
    description     : string;
    image           : string;
    categoryId      : number;
    rating?         : {
        rate        : number;
        count       : number;
    };
}
