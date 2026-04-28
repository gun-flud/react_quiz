CREATE TABLE IF NOT EXISTS questions (
    id UUID 
        DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL,
    question VARCHAR(1000) NOT NULL,
    type VARCHAR(20) NOT NULL 
        CHECK (type IN ('single', 'multiple', 'text', 'image')),
    
    PRIMARY KEY (id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
)