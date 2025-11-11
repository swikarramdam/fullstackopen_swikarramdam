# Step-by-Step Guide: Setting Up Migrations

## Step 1: Drop Existing Tables

You have two options:

### Option A: Using psql (PostgreSQL command line)

```bash
# Connect to your database
psql "postgresql://part13_postgres_user:SwjUJNofl8SlfPwkcu6PWUFWBynH3p11@dpg-d44q603e5dus73f9onug-a.singapore-postgres.render.com/part13_postgres?sslmode=require"

# Then run:
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS users CASCADE;

# Verify they're gone:
\dt

# Exit:
\q
```

### Option B: Using a SQL file

1. Copy the contents of `drop-tables.sql`
2. Run it in your database client (pgAdmin, DBeaver, etc.)

### Option C: Using Node.js script (easiest)

```bash
node -e "
const { sequelize } = require('./util/db');
(async () => {
  try {
    await sequelize.query('DROP TABLE IF EXISTS blogs CASCADE;');
    await sequelize.query('DROP TABLE IF EXISTS users CASCADE;');
    console.log('✅ Tables dropped successfully');
    await sequelize.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();
"
```

## Step 2: Run the Migration

After dropping the tables, run:

```bash
npm run migrate
```

This will:

- Create the `users` table with `created_at` and `updated_at`
- Create the `blogs` table with `created_at` and `updated_at`
- Set up the foreign key relationship

## Step 3: Verify It Worked

### Check 1: Migration Status

```bash
# Check if migration was recorded
npm run migrate
# Should say "No migrations were executed" if already run
```

### Check 2: Database Tables

Connect to your database and verify:

```sql
-- Check tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('users', 'blogs');

-- Check columns in users table
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users';

-- Check columns in blogs table
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'blogs';
```

You should see:

- `users` table: id, username, name, created_at, updated_at
- `blogs` table: id, author, title, url, likes, user_id, created_at, updated_at

### Check 3: Test Your Application

```bash
# Start your server
npm run dev

# In another terminal, test creating a user:
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","name":"Test User"}'

# Check if timestamps are automatically set:
curl http://localhost:3001/api/users
```

You should see `created_at` and `updated_at` fields in the response!

## Step 4: Verify Timestamps Work

1. Create a blog
2. Check the response - it should have `created_at` and `updated_at`
3. Update the blog (change likes)
4. Check again - `updated_at` should change, `created_at` should stay the same

## Troubleshooting

### If migration fails:

```bash
# Check migration status
npx sequelize-cli db:migrate:status

# Undo last migration if needed
npm run migrate:undo
```

### If tables already exist error:

- Make sure you dropped the tables first (Step 1)
- Check that you're not running `sequelize.sync()` anywhere in your code

### If foreign key errors:

- Make sure blogs table is dropped before users (CASCADE handles this)
- Or drop in this order: blogs first, then users
