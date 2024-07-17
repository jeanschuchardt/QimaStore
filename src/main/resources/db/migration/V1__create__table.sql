CREATE TABLE categories (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            parent_id INT,
                            FOREIGN KEY (parent_id) REFERENCES categories (id)
);

CREATE TABLE products (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          description TEXT,
                          price DECIMAL(10, 2) NOT NULL,
                          category_id INT NOT NULL,
                          available BOOLEAN DEFAULT TRUE,
                          FOREIGN KEY (category_id) REFERENCES categories (id)
);


INSERT INTO categories (name, parent_id) VALUES ('Electronics', NULL);
INSERT INTO categories (name, parent_id) VALUES ('Mobile Phones', 1);
INSERT INTO categories (name, parent_id) VALUES ('Iphone', 2);
INSERT INTO categories (name, parent_id) VALUES ('Android', 2);
INSERT INTO categories (name, parent_id) VALUES ('Laptops', 1);
INSERT INTO categories (name, parent_id) VALUES ('Home Appliances', NULL);
INSERT INTO categories (name, parent_id) VALUES ('Kitchen Appliances', 6);
INSERT INTO categories (name, parent_id) VALUES ('Televisions', 1);


INSERT INTO products (name, description, price, category_id, available)
VALUES ('iPhone 13', 'Latest Apple iPhone with A15 Bionic chip', 799.99, 2, TRUE);

INSERT INTO products (name, description, price, category_id, available)
VALUES ('Samsung Galaxy S21', 'Latest Samsung Galaxy phone with Exynos 2100', 699.99, 2, TRUE);

INSERT INTO products (name, description, price, category_id, available)
VALUES ('MacBook Pro', 'Apple MacBook Pro with M1 chip', 1299.99, 3, TRUE);

INSERT INTO products (name, description, price, category_id, available)
VALUES ('Dell XPS 13', 'Dell XPS 13 with Intel i7 processor', 999.99, 3, TRUE);

INSERT INTO products (name, description, price, category_id, available)
VALUES ('Sony Bravia 55"', '55-inch Sony Bravia 4K TV', 899.99, 6, TRUE);

INSERT INTO products (name, description, price, category_id, available)
VALUES ('Whirlpool Refrigerator', '500L capacity Whirlpool refrigerator', 499.99, 4, TRUE);

INSERT INTO products (name, description, price, category_id, available)
VALUES ('Philips Blender', 'High-speed blender for smoothies and more', 79.99, 5, TRUE);

INSERT INTO products (name, description, price, category_id, available)
VALUES ('Sansung s10', 'Cell phone' , 79.99, 4, TRUE);

INSERT INTO products (name, description, price, category_id, available)
VALUES ('iphone 15', 'Cell phone' , 79.99, 3, TRUE);