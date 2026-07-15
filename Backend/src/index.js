// It is the main switch of Your Backend
// when u run "npm run dev", node.js will run this file and it will start the server and listen to the port 3000
//Its job is to connect to mongodb and start the express server

import "./env.js";
import connectDB from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 8000;


// below code to connect to mongodb and start the express server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed");
    console.error(error);
  });