/**
 * @author Lucas Gonzalez
 * @description Interfaz de producto que retornaran los endpoints
 */
export interface Product {
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
