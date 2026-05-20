CREATE TABLE
    IF NOT EXISTS quizzes (
        id UUID DEFAULT gen_random_uuid (),
        creator_id UUID NOT NULL,
        title VARCHAR(255) NOT NULL,
        bg_image TEXT,
        description TEXT,
        visibility VARCHAR(9) NOT NULL 
            DEFAULT 'private' CHECK (visibility IN ('public', 'private', 'unlisted')),
        points INT DEFAULT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        
        PRIMARY KEY (id),
        FOREIGN KEY (creator_id) REFERENCES users (id) ON DELETE CASCADE
    )