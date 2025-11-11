# Migration Instructions

## Exercise 13.17 Summary

### What This Exercise Teaches:

1. **Database Migrations**: Version-controlled database schema changes
2. **Why Migrations Matter**:
   - Track database changes over time
   - Enable rollbacks if something goes wrong
   - Ensure consistent database state across environments
   - Team collaboration without manual SQL scripts

### Important Concepts:

1. **Migrations vs Sync**:

   - `sync()`: Automatically creates/alters tables based on models (development only)
   - Migrations: Explicit, version-controlled schema changes (production-ready)

2. **Migration Structure**:

   - `up()`: Applies the migration (creates tables, adds columns, etc.)
   - `down()`: Reverses the migration (drops tables, removes columns, etc.)

3. **Timestamps**:
   - `created_at`: When the record was created
   - `updated_at`: When the record was last modified
   - Automatically managed by Sequelize when `timestamps: true`

### Steps to Complete:

1. **Drop existing tables** (if needed):

   ```sql
   -- Connect to your database and run:
   DROP TABLE IF EXISTS blogs CASCADE;
   DROP TABLE IF EXISTS users CASCADE;
   ```

2. **Run the migration**:

   ```bash
   npm run migrate
   ```

3. **To undo a migration** (if needed):

   ```bash
   npm run migrate:undo
   ```

4. **To undo all migrations**:
   ```bash
   npm run migrate:undo:all
   ```

### What Was Changed:

1. ✅ Installed `sequelize-cli` as dev dependency
2. ✅ Created `.sequelizerc` configuration file
3. ✅ Created `migrations/` directory
4. ✅ Created initial migration file with both tables
5. ✅ Enabled `timestamps: true` in both User and Blog models
6. ✅ Removed `sequelize.sync()` from `index.js`
7. ✅ Added migration scripts to `package.json`
8. ✅ Updated `util/config.js` for Sequelize CLI compatibility

### Migration File Structure:

The migration file (`migrations/20241111000000-create-users-and-blogs.js`) includes:

- Users table with: id, username, name, created_at, updated_at
- Blogs table with: id, author, title, url, likes, user_id (foreign key), created_at, updated_at
- Proper foreign key relationship
- Both `up()` and `down()` methods for rollback capability
