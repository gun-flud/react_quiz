CREATE TABLE IF NOT EXISTS quizzes (
    id UUID UNIQUE 
        DEFAULT gen_random_uuid(), 
    creatior_id UUID NOT NULL, 
    bg_image TEXT, 
    title VARCHAR(255) NOT NULL, 
    description TEXT, 
    public BOOLEAN NOT NULL 
        DEFAULT false, 
    points INT 
        DEFAULT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (creatior_id) REFERENCES users(id) ON DELETE CASCADE
    )