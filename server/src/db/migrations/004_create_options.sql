CREATE TABLE IF NOT EXISTS options (
    id UUID 
        DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL,
    body VARCHAR(500) NOT NULL,
    is_correct BOOLEAN
        DEFAULT false,
    position INT NOT NULL 
        DEFAULT 0,

    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
)