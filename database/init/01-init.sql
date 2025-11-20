/*
@Author: Lucas Gonzalez
@description: Inicializador de la base de datos, en este caso use el script para crear las tablas en caso que no esten creadas (por el volume del docker-compose)
*/
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    description TEXT,
    image TEXT,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    rating JSONB
);

/*
Insertar categorias iniciales
*/
INSERT INTO categories (name) VALUES
('ropa de hombre'),
('joyería'),
('electrónica')
ON CONFLICT (name) DO NOTHING;

/*
Insertar productos iniciales
*/
INSERT INTO products (title, price, description, image, category_id, rating)
VALUES
('Fjallraven - Mochila Foldsack No. 1, para laptops de 15 pulgadas', 109.95,
 'Tu mochila perfecta para el uso diario y paseos por el bosque. Guarda tu laptop (hasta 15 pulgadas) en la funda acolchada, tu compañera de todos los días',
 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png', 
 (SELECT id FROM categories WHERE name = 'ropa de hombre'), 
 '{"rate": 3.9, "count": 120}'),

('Camisetas de hombre casual premium slim fit', 22.3,
 'Estilo ajustado, manga larga raglán en contraste, placket henley de tres botones, tela ligera y suave para un uso transpirable y cómodo.',
 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png', 
 (SELECT id FROM categories WHERE name = 'ropa de hombre'), 
 '{"rate": 4.1, "count": 259}'),

('Chaqueta de algodón para hombre', 55.99,
 'Excelentes chaquetas de abrigo para primavera/otoño/invierno, adecuadas para trabajo, senderismo, campamento, escalada y más.',
 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png', 
 (SELECT id FROM categories WHERE name = 'ropa de hombre'), 
 '{"rate": 4.7, "count": 500}'),

('Slim Fit casual para hombre', 15.99,
 'El color puede variar según pantalla. Ver guía de tallas en descripción.',
 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png', 
 (SELECT id FROM categories WHERE name = 'ropa de hombre'), 
 '{"rate": 2.1, "count": 430}'),

('Pulsera John Hardy Women''s Legends Naga Oro y Plata', 695,
 'De nuestra Colección Legends, inspirado en el dragón de agua que protege la perla del océano.',
 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png', 
 (SELECT id FROM categories WHERE name = 'joyería'), 
 '{"rate": 4.6, "count": 400}'),

('Oro macizo petite micropavé', 168,
 'Diseñado y vendido por Hafeez Center en Estados Unidos. Garantía 30 días.',
 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png', 
 (SELECT id FROM categories WHERE name = 'joyería'), 
 '{"rate": 3.9, "count": 70}'),

('Anillo Princesa chapado en oro blanco', 9.99,
 'Anillo de compromiso clásico con solitario de diamante creado para ella.',
 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png', 
 (SELECT id FROM categories WHERE name = 'joyería'), 
 '{"rate": 3, "count": 400}'),

('Pierced Owl Túnel Doble Acampanado', 10.99,
 'Túneles acampanados chapados en oro rosa, acero inoxidable 316L.',
 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png', 
 (SELECT id FROM categories WHERE name = 'joyería'), 
 '{"rate": 1.9, "count": 100}'),

('Disco duro externo portátil WD 2TB', 64,
 'Compatibilidad USB 3.0 y 2.0, transferencias rápidas de datos.',
 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png', 
 (SELECT id FROM categories WHERE name = 'electrónica'), 
 '{"rate": 3.3, "count": 203}'),

('SanDisk SSD PLUS 1TB Interno', 109,
 'Fácil actualización para un arranque más rápido y mejor performance.',
 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png', 
 (SELECT id FROM categories WHERE name = 'electrónica'), 
 '{"rate": 2.9, "count": 470}')
ON CONFLICT DO NOTHING;