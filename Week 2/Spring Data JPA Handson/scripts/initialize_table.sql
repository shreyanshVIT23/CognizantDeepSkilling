DROP TABLE IF EXISTS country;

-- 4. Create the country table
CREATE TABLE country (
    code VARCHAR(2) NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (code)
);

-- 5. Insert sample records
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

-- 6. Verify the data
SELECT * FROM country;

-- 7. Display table structure
DESCRIBE country;