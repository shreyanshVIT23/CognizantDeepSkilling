DROP TABLE IF EXISTS country;

CREATE TABLE country (
    code VARCHAR(2) NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (code)
);

INSERT INTO country (code, name)
VALUES
('IN', 'India'),
('US', 'United States of America'),
('GB', 'United Kingdom'),
('JP', 'Japan'),
('DE', 'Germany'),
('FR', 'France'),
('AU', 'Australia'),
('CA', 'Canada'),
('CN', 'China'),
('BR', 'Brazil');

SELECT * FROM country;

DESCRIBE country;