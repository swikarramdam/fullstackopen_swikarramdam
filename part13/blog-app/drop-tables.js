// Quick script to drop existing tables
// Run with: node drop-tables.js

const { sequelize } = require("./util/db");

(async () => {
  try {
    console.log("🔄 Dropping existing tables...");

    // Drop blogs first (has foreign key to users)
    await sequelize.query("DROP TABLE IF EXISTS blogs CASCADE;");
    console.log("✅ Dropped blogs table");

    // Then drop users
    await sequelize.query("DROP TABLE IF EXISTS users CASCADE;");
    console.log("✅ Dropped users table");

    // Verify
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'blogs')
    `);

    if (tables.length === 0) {
      console.log("✅ All tables dropped successfully!");
      console.log("📝 Now run: npm run migrate");
    } else {
      console.log("⚠️  Some tables still exist:", tables);
    }

    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
})();
