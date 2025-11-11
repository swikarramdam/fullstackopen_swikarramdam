-- Drop existing tables (run this in your database)
-- Note: CASCADE will also drop dependent objects like foreign key constraints

DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Verify tables are dropped
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'blogs');

