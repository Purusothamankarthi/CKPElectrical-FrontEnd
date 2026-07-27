CREATE DATABASE Karthi_service_shop;
USE karthi_service_shop;
CREATE TABLE users (
    username VARCHAR(100),
    password VARCHAR(100),
    confirm varchar(100)
);
select * from users;
CREATE TABLE service_records (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    phone VARCHAR(15),
    category VARCHAR(50),
    changed_parts VARCHAR(200),
    price DECIMAL(10,2),
    given_date DATE,
    delivery_date DATE,
    status VARCHAR(20),  -- Pending / Completed
    created_by VARCHAR(100) -- Stores username of user who entered the record
);
drop table service_records;
INSERT INTO service_records
(service_id, customer_name, phone, category, given_date, status, created_by)
VALUES
(43016, 'vickey', '8248123132', 'TV', CURDATE(), 'Pending', 'UserA');

select * from service_records;

-- Clear all data in customerdetails table
TRUNCATE TABLE customerdetails;

-- Clear all data in service_records table if applicable
-- TRUNCATE TABLE service_records;
CREATE TABLE sales (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    stock_id INT,
    quantity INT,
    sale_date DATE,
    total_price DECIMAL(10,2),
    FOREIGN KEY (stock_id) REFERENCES stock(stock_id)
);
drop table sales;
DROP TABLE IF EXISTS sales;
USE karthi_service_shop;

USE karthi_service_shop;

USE karthi_service_shop;

CREATE TABLE sales (
    stock_id INT AUTO_INCREMENT PRIMARY KEY,
    machine_name VARCHAR(100),
    company VARCHAR(100),
    model VARCHAR(100),
    price DECIMAL(10,2),
    count INT DEFAULT 1
);

ALTER TABLE sales 
ADD COLUMN quantity INT DEFAULT 1;

ALTER TABLE sales 
ADD UNIQUE (model);
drop table sales

