const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const mongoose = require("mongoose").default;
const connectionString = process.env.MONGO_URL;
mongoose.set("strictQuery", false);

// "mongodb+srv://pirmatovsobir23:KnSHlq9VR0dnUTzc@cluster0.kscois6.mongodb.net/bookShop";
// mongodb.connect(
mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, goose) => {
    if (err) console.log("Error on connection MongoDB");
    else {
      console.log("MongoDB connection succeed");

      const app = require("./app");
      const server = http.createServer(app);
      let PORT = process.env.PORT || 4001;
      server.listen(PORT, function () {
        console.log(
          `This server is running succesfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
