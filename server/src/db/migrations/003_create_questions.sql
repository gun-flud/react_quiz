CREATE TABLE IF NOT EXISTS questions (
    id UUID UNIQUE
        DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL,
    question VARCHAR(1000) NOT NULL,
    type VARCHAR(20) NOT NULL 
        CHECK (type IN ('single', 'multiple', 'text', 'image')),
    -- input_type BOOLEAN
    --     DEFAULT false,
    -- option_type BOOLEAN
    --     DEFAULT false,
    
    PRIMARY KEY (id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
)