ALTER TABLE users
    ADD COLUMN is_verified BOOLEAN DEFAULT false,
    ADD COLUMN verification_token VARCHAR(255),
    ADD COLUMN token_expires_at TIMESTAMPTZ;