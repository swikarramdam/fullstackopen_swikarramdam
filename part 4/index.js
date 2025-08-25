const app = require("./app");
const config = require("./utils/config");
const PORT = 3003;
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
