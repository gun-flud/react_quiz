CREATE TABLE IF NOT EXISTS quizzes (
    id UUID  
        DEFAULT gen_random_uuid(), 
    creator_id UUID NOT NULL, 
    bg_image TEXT, 
    title VARCHAR(255) NOT NULL, 
    description TEXT, 
    public BOOLEAN NOT NULL 
        DEFAULT false, 
    points INT 
        DEFAULT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
    )