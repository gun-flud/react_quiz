CREATE TABLE IF NOT EXISTS users (
    id UUID 
        DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(400) NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    profile_photo VARCHAR(255),
    profile_description TEXT,
    role VARCHAR(20) NOT NULL 
        DEFAULT 'student'
        CHECK (role IN ('student', 'teacher', 'admin')),

    PRIMARY KEY (id)
)