const app = require("./src/app.js");
const logger = require("./src/logger/logger.js");

const PORT = process.env.PORT || 8050;

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
