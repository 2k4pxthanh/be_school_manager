const Http = require("http");
const app = require("./app/app");
require("dotenv").config();
require("./app/config/dbConnect");

const server = Http.createServer(app);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
