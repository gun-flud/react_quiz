CREATE TABLE IF NOT EXISTS users (
    id UUID UNIQUE
        DEFAULT gen_random_uuid(),
    user VARCHAR(100) NOT NULL,
    password_hash VARCHAR(400) NOT NULL,
    email VARCHAR(60),
    profile_photo VARCHAR(255),
    profile_description TEXT,
    role VARCHAR(20),

    PRIMARY KEY (id)
)