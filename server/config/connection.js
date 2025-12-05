const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portalDB";

mongoose.connection.on("connected", () =>
  console.log(`Mongoose connected to ${mongoUri}`)
);
mongoose.connection.on("error", (err) =>
  console.error("Mongoose connection error:", err)
);
mongoose.connection.on("disconnected", () =>
  console.warn("Mongoose disconnected")
);

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error("Initial Mongoose connection error:", err));

module.exports = mongoose.connection;
