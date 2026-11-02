CREATE TABLE login (
    bennett_email VARCHAR(255) PRIMARY KEY,
    password_hash TEXT NOT NULL
);

CREATE TABLE users (
    bennett_email VARCHAR(255) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'member',
    FOREIGN KEY (bennett_email)
        REFERENCES login(bennett_email)
        ON DELETE CASCADE
);
